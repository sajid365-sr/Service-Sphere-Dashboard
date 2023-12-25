import { ModalProvider } from "@/providers/modal-porvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { ReduxProvider } from "@/providers/redux-provider";
import { ToasterProvider } from "@/providers/toast-provider";

export const metadata = {
  title: "Service Sphere",
  description: "Explore the future",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en">
          <body>
            {children}
            <ModalProvider />
            <ToasterProvider />
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
