import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export async function POST({ request, locals }) {
	const project = await request.json();
	console.log(project);
	const session = await locals.auth();

	const id = nanoid();
	// FIXME: project needs to be validated. also, ratelimits.
	await db.insert(projects).values({
		id,
		name: project.name,
		owner: session?.user?.id,
		content: JSON.stringify(project)
	});

	return json({
		success: true,
		id
	});
}
