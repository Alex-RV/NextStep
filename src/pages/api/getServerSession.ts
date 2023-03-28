import { getSession, useSession } from 'next-auth/react'

export async function getStaticProps() {
//   const session = await getSession();
const { data: session } = useSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const range = "A1:K5000";
  const column = "D1:D5000";
  const searchValue = session.user.email;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const url = new URL('/api/read_sheets', baseUrl);
  url.searchParams.append('column', column);
  url.searchParams.append('searchValue', searchValue);
  url.searchParams.append('range', range);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const content = await response.json();

  return {
    props: { content }
  }
}
