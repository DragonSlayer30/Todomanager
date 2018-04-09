/**
 * A simple task object. This will be our primary data model for this challenge
 *
 * 	id:  must be a number and is required for task items that have been persisted in the backend, these must be unique.
 *       The backend will create this feild for you
 *  title: is required and must be a string
 *  description: is optional. if specified, it must be a string
 *  due: is optional. if specified, it must be a string that is in a valid ISO8601 format.
 *  done: is a required boolean, signifying if a task has been completed.
 */
export interface Task {
    id: number;
    title: string;
    description?: string;
    due?: string;
    done: boolean;
}