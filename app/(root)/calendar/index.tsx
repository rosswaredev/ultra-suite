import * as Calendar from "expo-calendar";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { tw } from "src/theme";

export default function CalendarHome() {
  const [myCalendars, setCalendars] = React.useState<
    Calendar.Calendar[] | null
  >(null);
  const [myEvents, setEvents] = React.useState<Calendar.Event[] | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        setCalendars(calendars);
        console.log("Here are all your calendars:");
      }
    })();
  }, []);

  // Get all the events for all the calendars
  const getEvents = useEffect(() => {
    (async () => {
      const events = await Calendar.getEventsAsync(
        myCalendars?.map((c) => c.id),
        new Date("2023-01-21"),
        new Date("2023-01-22")
      );
      console.log("Here are all your events:");
      console.log(JSON.stringify(events));
      setEvents(events);
    })();
  }, [myCalendars]);

  // Grouped by source.id, then by title
  const groupedCalendars = myCalendars?.reduce((acc, calendar) => {
    const { source } = calendar;
    const key = `${source.id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(calendar);
    return acc;
  }, {} as Record<string, Calendar.Calendar[]>);

  console.log(myCalendars?.[0].isVisible);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {myEvents?.map((event) => (
        <View key={event.id}>
          <Text style={tw`text-primary-base`}>{event.title}</Text>
          <Text style={tw`text-base-content`}>
            {JSON.stringify(event, null, 2)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}
