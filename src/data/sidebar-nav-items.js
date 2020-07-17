export default function() {
  return [
    {
      title: "Dashboards",
      items: [
        {
          title: "Blog Dashboard",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        },
        {
          title: "Blog Posts",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          to: "/blog-posts",
        },
        {
          title: "Add A Post",
          htmlBefore: '<i class="material-icons">note_add</i>',
          open: false,
          items: [
            {
              title: "Add New Post",
              to: "/add-new-post",
            },
            {
              title: "Add New Sermon",
              to: "/add-new-sermon",
            },
          ],
        },
        {
          title: "Forms & Components",
          htmlBefore: '<i class="material-icons">view_module</i>',
          to: "/components-overview",
        },
        {
          title: "Tables",
          htmlBefore: '<i class="material-icons">table_chart</i>',
          to: "/tables",
        },
        {
          title: "User Profile",
          htmlBefore: '<i class="material-icons">person</i>',
          to: "/user-profile-lite",
        },
        {
          title: "Errors",
          htmlBefore: '<i class="material-icons">error</i>',
          to: "/errors",
        },
      ],
    },
  ];
}
