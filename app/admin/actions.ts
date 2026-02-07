"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { initialProjects } from "@/lib/constants";

/* ---------------- Projects ---------------- */

export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const image = formData.get("image") as string;
  const tagsString = formData.get("tags") as string;
  const github = (formData.get("github") as string) || "#";
  const live = (formData.get("live") as string) || "#";

  const tags = tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t !== "");

  try {
    await prisma.project.create({
      data: { title, desc, image, tags, github, live },
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("❌ Failed to add project:", error);
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("❌ Failed to delete project:", error);
  }
}

export async function getProjects() {
  try {
    let projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Seed if empty
    if (!projects.length) {
      await prisma.project.createMany({
        data: initialProjects.map(p => ({
          title: p.title,
          desc: p.desc,
          image: p.image,
          tags: p.tags,
          github: p.github,
          live: p.live
        })),
      });
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return { data: JSON.parse(JSON.stringify(projects)), isFallback: false };
  } catch (error: any) {
    console.error(
      "⚠️ getProjects fallback triggered. Returning initialProjects:",
      error.message
    );
    return { data: initialProjects, isFallback: true };
  }
}

/* ---------------- Messages ---------------- */

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const isAppointment = formData.get("isAppointment") === "on";

  try {
    await prisma.message.create({
      data: { name, email, subject, message },
    });

    if (isAppointment) {
      await prisma.appointment.create({
        data: {
          name,
          email,
          time: new Date(Date.now() + 86400000),
          roomId: Math.random().toString(36).substring(7),
        },
      });
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error(
      `❌ DB error: From: ${name} (${email}), Subject: ${subject}, Message: ${message}`
    );
    return { error: "Database error. Message could not be saved." };
  }
}

export async function getMessages() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(messages));
  } catch {
    return [];
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("❌ Failed to delete message:", error);
  }
}

/* ---------------- Appointments ---------------- */

export async function getAppointments() {
  try {
    const apps = await prisma.appointment.findMany({
      orderBy: { time: "asc" },
    });
    return JSON.parse(JSON.stringify(apps));
  } catch {
    return [];
  }
}

/* ---------------- Blog Posts ---------------- */

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export async function addPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const image = formData.get("image") as string;
  const tagsString = formData.get("tags") as string;
  const tags = tagsString.split(",").map(t => t.trim()).filter(t => t !== "");

  try {
    await prisma.post.create({
      data: { title, content, slug, image, tags },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("❌ Failed to add post:", error);
    return { error: "Failed to add post" };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("❌ Failed to delete post:", error);
  }
}
