import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import * as Calendar from "expo-calendar";

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
        // console.log(JSON.stringify(calendars));
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
      {/* <Text>Calendar Home</Text>
      {Object.entries(groupedCalendars ?? {}).map(([sourceId, calendars]) => (
        <View key={sourceId}>
          <Text className="text-base-content text-lg">
            {calendars[0].source.name}
          </Text>
          {calendars.map((calendar) => (
            <View key={calendar.id} className="">
              <Text className="text-primary-base">{calendar.title}</Text>
              <Text className="text-base-content">
                {JSON.stringify(calendar, null, 2)}
              </Text>
            </View>
          ))}
        </View>
      ))}
      <Button title="Create a new calendar" onPress={createCalendar} /> */}
      {myEvents?.map((event) => (
        <View key={event.id} className="">
          <Text className="text-primary-base">{event.title}</Text>
          <Text className="text-base-content">
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
