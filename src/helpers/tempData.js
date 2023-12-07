import orphic from "../assets/images/orphic.jpg";
import malhar from "../assets/images/malhar.png";
import rasoi from "../assets/images/rasoi.png";
import sasariyo from "../assets/images/sasariyo.png";
import abide from "../assets/images/abide.png";
import naansense from "../assets/images/naansense.png";

export const sidebarMenus = [
  {
    name: "Work",
    id: 1,
    clientList: [
      {
        clientId: 1,
        clientName: "Orphic",
        clientPic: orphic,
      },
      {
        clientId: 2,
        clientName: "Abide",
        clientPic: abide,
      },
      {
        clientId: 3,
        clientName: "Sasariyo",
        clientPic: sasariyo,
      },
      {
        clientId: 4,
        clientName: "Rasoi",
        clientPic: rasoi,
      },
      {
        clientId: 5,
        clientName: "Malhar",
        clientPic: malhar,
      },
      {
        clientId: 6,
        clientName: "Naan sense",
        clientPic: naansense,
      },
    ],
  },
  {
    name: "About Me",
    id: 2,
  },
  {
    name: "Contact",
    id: 3,
  },
];
