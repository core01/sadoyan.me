import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(process.env.OG_IMAGE_SECRET_KEY),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
);

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const data = searchParams.get('data');
  const params = new URLSearchParams(decodeURIComponent(data as string));

  const title = params.get('title') || '';
  const slug = params.get('slug');
  const token = params.get('token');

  const verifyToken = toHex(
    await crypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(JSON.stringify({ slug }))
    )
  );

  if (token !== verifyToken) {
    return new Response('Invalid token.', { status: 401 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="flex flex-col justify-center w-full h-full">
          <div tw="text-6xl mb-10 mx-auto px-10 text-gray-700">{title}</div>
          <div tw="absolute right-0 bottom-20 h-16 items-center bg-gray-700 px-4 font-sans text-4xl text-white">
            ROMAN SADOYAN
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
