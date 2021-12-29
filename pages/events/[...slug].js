import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

function FilteredEventsPage(props) {
    const router = useRouter();
    // const filterData = router.query.slug;
    //making sure that there is no access to the URL when there is no data yet
    // if (!filterData) {
    //     return <p className="center">Loading..</p>
    // }
    // const filteredYear = filteredData[0];
    // const filteredMonth = filteredData[1];
    // const numYear = + filteredYear;
    // const numMonth = + filteredMonth;

    //protects the URL
    if (
        props.hasError
    )
    {
        return<Fragment>
            <p>Invalid filter...</p>
            <div className="center">
                <Button link="/events">Show all events</Button>
                       </div>
        </Fragment>
    }
    
    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <p>No events found...</p>
            <div className="center">
                <Button link="/events">Show all events</Button>
                       </div>
        </Fragment>
    };

    const date = new Date(props.date.year, props.date.month-1);

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}
export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];
    const numYear = + filteredYear;
    const numMonth = + filteredMonth;

    //protects the URL
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12)
    {
        return {
            props:{ hasError: true}
        }
    }
    
    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}

export default FilteredEventsPage;