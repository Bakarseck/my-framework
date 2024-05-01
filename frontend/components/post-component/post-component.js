import Component from "../Component.js";
export default class PostComponent extends Component {
  constructor(shadowRoot, name) {
    const model = {
      posts: [
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "John Doe",
          username: "@johndoe",
          timestamp: "1h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "This is a tweet!",
        },
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "Jane Doe",
          username: "@janedoe",
          timestamp: "2h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "Another tweet here.",
        },
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "John Doe",
          username: "@johndoe",
          timestamp: "1h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "This is a tweet!",
        },
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "Jane Doe",
          username: "@janedoe",
          timestamp: "2h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "Another tweet here.",
        },
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "John Doe",
          username: "@johndoe",
          timestamp: "1h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "This is a tweet!",
        },
        {
          userImage: "https://via.placeholder.com/48",
          fullName: "Jane Doe",
          username: "@janedoe",
          timestamp: "2h ago",
          postImage: "https://via.placeholder.com/600x300",
          text: "Another tweet here.",
        },
      ],
    };
    super(shadowRoot, name, model);
  }

  cliked() {
    console.log("clické");
  }
}
