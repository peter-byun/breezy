import { Card } from "./type";

export const dummyCards: Card[] = [
  {
    id: "1",
    title: "What is React?",
    content: "A JavaScript library for building user interfaces.",
    order: 1,
    memorized: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    memorizedAt: null,
  },
  {
    id: "2",
    title: "What is a Closure in JavaScript?",
    content:
      "A closure is a function that has access to its outer function scope even after the outer function has returned.",
    order: 2,
    memorized: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    memorizedAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: "3",
    title: "HTTP Status Code 404",
    content: "Not Found - The requested resource could not be found.",
    order: 3,
    memorized: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    memorizedAt: null,
  },
  {
    id: "4",
    title: "What is the Time Complexity of Binary Search?",
    content: "O(log n)",
    order: 4,
    memorized: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    memorizedAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "5",
    title: "CSS Flexbox - justify-content",
    content:
      "Defines how the browser distributes space between and around content items along the main axis of a flex container.",
    order: 5,
    memorized: false,
    createdAt: Date.now() - 1000 * 60 * 10, // 10 minutes ago
    memorizedAt: null,
  },
];
