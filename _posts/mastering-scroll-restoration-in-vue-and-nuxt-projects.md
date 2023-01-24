---
title: Mastering Scroll Position Restoration in Vue and Nuxt Projects
author: Roman Sadoyan
publishedAt: 24 Jan 2023
---

It feels familiar when you're working with a dynamic list of items and want to preserve the scroll position when returning to the list from a detailed page. To keep the data during navigation, it's necessary to store it outside the component, for example, in the Vuex store. This way, you can easily access it from any component in your application. Additionally, using the browser's Forward/Back buttons will automatically restore the scroll position on the page, thanks to the scrollBehavior method, which receives the third argument with the x and y coordinates of the scroll position passed from the popstate browser event.

However, what if you're using breadcrumbs with a link to the list of items or something similar? So how can we restore the previous scroll position in this case? One option would be to emulate the browser's back button click, but this may not provide the best user experience.

This article will explore a step-by-step process for implementing scroll position restoration in Vue and Nuxt projects. We'll review the best solution I found to work best and how to restore the scroll position in different scenarios, providing a smooth user experience.

Imagine that we have three pages:

1. an Index page
2. a List items page
3. and a Detailed page.

A user opens the List items page from the Index page, clicks on an item to view the Detailed page, and then wants to go back and click on the breadcrumb item. We emulate the `history.back()` event, and the user sees the List items page with the scroll position restored - everything seems fine.
However, there's a problem: if the user clicks the browser's back button, they will not be redirected to the Detailed page as expected because we already popped the state.

Instead, they will be redirected to the Index page. This behaviour can be unexpected for the user and can break the user experience, as they want to navigate to the previous page (Detailed page), but instead, we're navigating them to the pre-previous page (Index page).

So, what should we do in this case? In this article, I'll show you how to implement a solution for Nuxt 2, which should also work for Nuxt 3. I'll use https://swapi.dev/ for list item requests to fully explore the problem.
Let's dive in!

Let's reproduce 3 pages from the example above:

1. Index page
2. Page with the list of items (subsequent items can be loaded by button)
3. The page with detailed info about the item

First, we need to store data outside the page component to request it only if we do not have items yet. Vuex is a good choice for that. Then, we can extract the request to Vuex action as well.

This is how the page with list items looks like:
![Planets page](/media/posts/mastering-scroll-restoration-in-vue-and-nuxt-projects/planets-list.png 'Planets page')

There is a check of data existence and `$fetchState.pending` status to show `Loading` while data is loading. There is a fetch which checks if data exists or not and only if not calls the action.

```js
<template>
  <main>
    <h1>Planets</h1>
    <NuxtLink :to="`/`">To the main</NuxtLink>
    <p v-if="!getHasPlanets && $fetchState.pending">Loading planets...</p>
    <ul v-else>
      <li v-for="(planet, i) in getPlanets" :key="planet.name">
        <NuxtLink :to="`/${i}`">{{ planet.name }}</NuxtLink>
      </li>
    </ul>
    <template v-if="getHasNextPage">
      <p v-if="loading">Loading next page...</p>
      <button v-else @click="loadNextPage">Load next page</button>
    </template>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
  async fetch() {
    if (!this.getHasPlanets) await this.loadPlanets();
  },
  computed: {
    ...mapGetters(["getHasPlanets", "getPlanets", "getHasNextPage"]),
  },
  methods: {
    ...mapActions({
      loadPlanets: "loadPlanets",
    }),
    async loadNextPage() {
      this.loading = true;
      await this.loadPlanets();
      this.loading = false;
    },
  },
};
</script>
```

What for a detailed page - nothing complex.
![Planet page](/media/posts/mastering-scroll-restoration-in-vue-and-nuxt-projects/planet-page.png 'Planet page')
There is no need to store detailed information in the store, so we can request it inside the page's fetch.

```js
<template>
  <div>
    <div v-if="$fetchState.pending">Loading...</div>
    <div v-else>
      <NuxtLink to="/planets">To the planets</NuxtLink>
      <p v-for="(value, key) in planet" :key="key">{{ key }}: {{ value }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      planet: null,
    };
  },
  async fetch() {
    this.planet = await this.loadPlanet(this.$route.params.planetId);
  },
  methods: {
    ...mapActions({
      loadPlanet: "loadPlanet",
    }),
  },
};
</script>
```

Let's see how it works now. We have a list of items, and the detailed page opens when we click on an item. However, if we load a few pages before proceeding to the detailed page, we face a problem. When we use the browser's back button, everything works as expected, and the scroll position is restored. But when we use a non-browser's back button, such as a breadcrumb link, the scroll position is reset, and we see the top of the list. So, why does this happen?

The reason is that Nuxt handles browser events well when you click back/forward buttons, but these events do not fire when you click on breadcrumb items. This means there's no way to make it fire at all. How can we restore the previous scroll position in this case?

I have a solution for this problem, there may be better ones, but it works. If you have a better solution, please let me know. Nuxt (originally vue) provides a function called scrollBehavior ([https://v3.router.vuejs.org/guide/advanced/scroll-behavior.html](https://v3.router.vuejs.org/guide/advanced/scroll-behavior.html)) that is fired after navigating between routes and handles navigating using back/forward browser buttons. We can return the x and y coordinates, and the scroll position will be restored. This means we need to save the scroll position and then use this data in the scrollBehavior function.

The store is the most suitable place to keep the scroll positions independent of pages and components. So, let's add a few actions to our store.

```js
export const state = () => ({
  planets: [],
  page: 1,
  hasNextPage: true,
  offsets: {},
});

export const getters = {
  getPlanets(state) {
    return state.planets;
  },
  getPage(state) {
    return state.page;
  },
  getHasNextPage(state) {
    return state.hasNextPage;
  },
  getHasPlanets(state) {
    return state.planets.length > 0;
  },
};

export const mutations = {
  incrementPage(state) {
    state.page++;
  },
  addPlanets(state, planets) {
    state.planets.push(...planets);
  },
  setHasNextPage(state, value) {
    state.hasNextPage = value;
  },
  setRouteOffsetTop(state, [path, offset]) {
    state.offsets[path] = offset;
  },
};

export const actions = {
  async loadPlanets({ state, getters, commit }) {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${getters.getPage}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    commit('incrementPage');
    commit('addPlanets', data.results);
    commit('setHasNextPage', !!data.next);
  },
  async loadPlanet(ctx, id) {
    return fetch(`https://swapi.dev/api/planets/${id}`, {
      method: 'GET',
    }).then((response) => response.json());
  },
  setRouteOffsetTop({ commit }, [path, offset]) {
    commit('setRouteOffsetTop', [path, offset]);
  },
};
```

To save scroll position for all pages, we will use a nuxt layout - the perfect place for such handlers.

```js
<template>
  <Nuxt />
</template>
<script>
import { mapActions } from "vuex";
import { scrollRestorationMap } from "~/constants/Scroll";

export default {
  methods: {
    ...mapActions(["setRouteOffsetTop"]),
    onScroll() {
      const offsetTop = window.scrollY || document.documentElement.scrollTop;
      if (Object.keys(scrollRestorationMap).includes(this.$route.name)) {
        this.setRouteOffsetTop([this.$route.fullPath, offsetTop]);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>
```

When restoring the scroll position in Vue and Nuxt projects using breadcrumb links, we face a limitation: there are no additional arguments in the `appRouteBehaviour` context from which we can access the Nuxt store. To work around this limitation, we can use the Vuex store directly from the global window object via `windows.nuxt.vuex`. However, it's important to note that this method only works on the client side and is safe for SSR projects.

Another essential aspect to consider when restoring the scroll position is that we need to determine on which pages we want to restore the scroll position. For example, it can confuse users if the scroll position is restored on a list items page when revisiting it from the main page, as it may scroll them to the bottom of the list. To avoid this, we can create a map of routes with the route name as the key and the values as a route name or array of route names. This map allows us to specify which pages we want to restore the scroll position on, but it also requires some maintenance, as it needs to be updated when routes are moved or renamed.

We can use `.nuxt/routes.json` to find route names in Nuxt, and for the Vue to keep the code clear, router name constants can be used. Additionally, `scrollBehaviour` supports async scrolling, which can improve the user experience by making the scroll behaviour play nicely with page transitions.

This is how the result map looks like:

```js
export const scrollRestorationMap = {
  planets: ['planetId'],
};
```

That's it! Here is how it works:

<video controls="controls" autoplay loop muted src='/media/posts/mastering-scroll-restoration-in-vue-and-nuxt-projects/result.mp4'></video>

The full example can be found in [codesandbox](https://codesandbox.io/s/crazy-currying-oftbk5), and I hope it is helpful for you.

##### Summary

In this article, we discussed a solution for restoring scroll position in Vue and Nuxt projects using breadcrumb links. The solution involves using the Vuex store directly from the global window object via `windows.nuxt.vuex` and creating a map of routes to specify which pages we want to restore the scroll position on.
One of the main benefits of this solution is that it works and doesn't break the user experience. However, it also comes with some drawbacks. One is that it requires some maintenance, as the map of routes needs to be updated when pages are added, moved or renamed. Additionally, the solution involves the direct use of Vuex via window.nuxt.store, which some developers may consider a negative point.
Overall, this solution can be helpful for developers who are facing the problem of restoring the scroll position with breadcrumb links in Vue and Nuxt projects.
