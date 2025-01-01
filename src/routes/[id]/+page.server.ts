import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
    const { id } = params;
    const session = await locals.auth();

    let project = await db.select().from(projects).where(eq(projects.id, id)).get();
    if (!project) {
        return error(404, 'Project not found');
    }

    return {
        project: JSON.parse(project.content),
        isOwner: project.owner === session?.user?.id
    };

};
