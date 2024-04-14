export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      //const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnProfilePage = request.nextUrl?.pathname.startsWith("/profile");
      const isOnMediaPage = request.nextUrl?.pathname.startsWith("/media");
      const isOnCategoryPage = request.nextUrl?.pathname.startsWith("/category");
      const isOnProductPage = request.nextUrl?.pathname.startsWith("/product/new");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      // if (isOnBlogPage && !user) {
      //   return false;
      // }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/profile", request.nextUrl));
      }

      if ((isOnProfilePage || isOnMediaPage || isOnCategoryPage || isOnProductPage) && !user) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      return true
    },
  },
};
