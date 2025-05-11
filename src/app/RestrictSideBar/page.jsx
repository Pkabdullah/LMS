"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/NavBar";

export default function Layout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/", "/choose", "/Login", "/AdminRegistration"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  if (isNoLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div
        className={`flex flex-col flex-1 transition-all duration-200 ${
          isSidebarExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
        />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

// "use client";

// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import Sidebar from "../component/Sidebar";
// import Navbar from "../component/NavBar";

// export default function Layout({ children }) {
//   const pathname = usePathname();
//   const noLayoutRoutes = ["/choose", "/Login", "/AdminRegistration"];
//   const isNoLayout = noLayoutRoutes.includes(pathname);

//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
//   const [activeItem, setActiveItem] = useState("Home");

//   const toggleSidebar = () => {
//     setIsSidebarExpanded((prev) => !prev);
//   };

//   return (
//     <div className="flex min-h-screen">
//       {!isNoLayout && (
//         <Sidebar
//           isSidebarExpanded={isSidebarExpanded}
//           toggleSidebar={toggleSidebar}
//           activeItem={activeItem}
//           setActiveItem={setActiveItem}
//         />
//       )}

//       <div className="flex flex-col flex-1">
//         {!isNoLayout && <Navbar toggleSidebar={toggleSidebar} />}
//         <main className="p-4">{children}</main>

//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { usePathname } from "next/navigation";
// // import Sidebar from "../component/Sidebar";

// // export default function Layout({ children }) {
// //   const pathname = usePathname();

// //   const noLayoutRoutes = ["/choose","/Login","/AdminRegistration"];
// //   const isNoLayout = noLayoutRoutes.includes(pathname);
// //   return (
// //     <div className="flex min-h-screen">
// //         {!isNoLayout && <Sidebar />}
// //         <main className="flex-1">{children}</main>
// //           {/* {!isNoLayout && <Footer1 />} */}

// //     </div>
// //   );
// // }
