/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Events = "events",
	Habits = "habits",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EventsRecord<Taction = unknown> = {
	action: null | Taction
	version?: number
}

export type HabitsRecord = {
	title: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type EventsResponse<Taction = unknown> = EventsRecord<Taction> & BaseSystemFields
export type HabitsResponse = HabitsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	events: EventsRecord
	habits: HabitsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	events: EventsResponse
	habits: HabitsResponse
	users: UsersResponse
}