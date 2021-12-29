import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();
    const filteredData = router.query.slug;

    const { data, error } = useSWR("https://nextjs-f78fd-default-rtdb.europe-west1.firebasedatabase.app/events.json");

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
                setLoadedEvents(events);
            }
        }
    }, [data]);

    let pageHead = <Head>
        <title>Filtered Events</title>
         <meta name="description" content={`List of filtered events`}/>
    </Head>

    //making sure that there is no access to the URL when there is no data yet
    if (!loadedEvents) {
        return <Fragment>{pageHead}<p className="center">Loading..</p></Fragment>
    }
    
    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];
    const numYear = + filteredYear;
    const numMonth = + filteredMonth;

 pageHead = (
         <Head>
         <title>Filtered Events</title>
         <meta name="description" content={`All events for ${numYear}`}/>
         </Head>
    )

    //protects the URL
    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error) {
        return <Fragment>
            {pageHead}
            <p>Invalid filter...</p>
            <div className="center">
                <Button link="/events">Show all events</Button>
                       </div>
        </Fragment>
    }

    const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1;
       });
    
    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            {pageHead}
            <p>No events found...</p>
            <div className="center">
                <Button link="/events">Show all events</Button>
                       </div>
        </Fragment>
    };

    const date = new Date(numYear, numMonth-1);

    return (
        <Fragment>
            {pageHead}
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}
// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];
//     const numYear = + filteredYear;
//     const numMonth = + filteredMonth;

//     //protects the URL
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12)
//     {
//         return {
//             props:{ hasError: true}
//         }
//     }
    
//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {npm run dev

//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventsPage;