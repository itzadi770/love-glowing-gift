import memoryVideoAsset from "@/assets/memory-01.mp4.asset.json";

// ✨ EDIT ME — All personal content lives here.
export const loveConfig = {
  herName: "My Love",
  princessName: "Princess",

  // Set the day you started dating (YYYY-MM-DD)
  relationshipStart: "2023-02-14",

  // Her birthday (YYYY-MM-DD, this year or next)
  birthday: "2026-07-15",

  loveLetter: `My dearest love,

From the very first moment I saw you, my world became a little softer, a little brighter, and infinitely more beautiful. You are my sunrise and my favorite kind of quiet. On your birthday I just want you to know — every heartbeat of mine belongs to you, today and always.

Happy Birthday, my forever girl. ❤️`,

  // Drop images into public/photos and list them here
  photos: [
    { src: "/photos/hero.png", caption: "Us, under the fairy lights ✨" },
    { src: "/photos/collage.png", caption: "All our little forevers 💕" },
    { src: "/photos/hero.png", caption: "Your smile — my favorite view 🌸" },
    { src: "/photos/collage.png", caption: "Every moment with you 🕰️" },
    { src: "/photos/hero.png", caption: "My whole heart 💖" },
    { src: "/photos/collage.png", caption: "Forever & always 🤍" },
  ],

  // Videos are served from the bundled asset CDN so they work after publishing/deployment.
  videos: [
    { src: memoryVideoAsset.url },
  ] as Array<{ src: string; poster?: string }>,

  // Drop a song into public/music and set filename here
  musicFile: "/music/song.mp3",
  musicTitle: "Our Song",

  timeline: [
    { emoji: "❤️", title: "The day we met", desc: "The universe finally got it right." },
    { emoji: "💬", title: "Our first conversation", desc: "Hours felt like minutes with you." },
    { emoji: "🌹", title: "Our first date", desc: "You wore that smile I still dream about." },
    { emoji: "✈️", title: "Our favorite trip", desc: "Anywhere becomes home with you." },
    { emoji: "📸", title: "A thousand little memories", desc: "Each one my favorite, until the next." },
    { emoji: "🎂", title: "Today — Your Birthday", desc: "The most important day of the year." },
  ],

  reasons: [
    { emoji: "😊", title: "Your smile", back: "It rearranges my whole day." },
    { emoji: "❤️", title: "Your kindness", back: "You love the world so gently." },
    { emoji: "🌸", title: "Your cute personality", back: "Impossibly adorable, always." },
    { emoji: "😂", title: "Your laughter", back: "My favorite sound on earth." },
    { emoji: "💕", title: "Your caring heart", back: "You make everyone feel safe." },
    { emoji: "✨", title: "Everything about you", back: "Every little thing. Truly." },
  ],
};