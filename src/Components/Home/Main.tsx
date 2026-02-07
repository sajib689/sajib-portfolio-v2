"use client";

import { useEffect } from "react";
import io from "socket.io-client";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

let socket: any;

const Main = ({ projects, isFallback }: { projects: any[], isFallback: boolean }) => {
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("Connected to dynamic tracking");
        socket.emit("visitor-update", {
          path: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
      });
    };

    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} isFallback={isFallback} />
      <Contact />
    </main>
  );
};




export default Main;
