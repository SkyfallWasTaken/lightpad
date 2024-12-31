import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const projects = sqliteTable('projects', {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text('name').notNull(),
	owner: text('owner'),
	content: text('content').notNull()
});