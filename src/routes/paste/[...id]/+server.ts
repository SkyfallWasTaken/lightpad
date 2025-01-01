import { db } from "$lib/server/db"
import { projects } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET({ params, locals }) {
    const session = await locals.auth();

    let project = await db.select().from(projects).where(eq(projects.id, params.id)).get();
    if (!project) {
        return new Response("Not Found", { status: 404 });
    }
    project.content = JSON.parse(project.content);
    return json({
        ...project,
        isOwner: project.owner === session?.user?.id
    })
}

export async function PATCH({ request, locals, params }) {
    const session = await locals.auth();
    if (!session || !session.user || !session.user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const project = await db.select().from(projects).where(eq(projects.id, params.id)).get();
    if (!project) {
        return new Response("Not Found", { status: 404 });
    }
    if (project.owner !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
    }

    const data = await request.json();
    delete data.isOwner;
    await db.update(projects).set(data).where(eq(projects.id, params.id));
    return json({})
}

export async function DELETE({ locals, params }) {
    const session = await locals.auth();
    if (!session || !session.user || !session.user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const project = await db.select().from(projects).where(eq(projects.id, params.id)).get();
    if (!project) {
        return new Response("Not Found", { status: 404 });
    }
    if (project.owner !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
    }

    await db.delete(projects).where(eq(projects.id, params.id));
    return json({})
}
