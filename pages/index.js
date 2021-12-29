import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS App</title>
        <meta name="description" content="Find some events"/>
      </Head>
      <EventList items={props.featuredEvents }/>
    </div>
  )
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
