import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs as LibraryBreadcrumbs } from "@NicolasSancho/storybook-core";

/**
 * A wrapper to adapt react-router-dom's Link
 * to the Breadcrumbs component API
 */
export const Breadcrumbs = ({ items, className }) => {
  return (
    <LibraryBreadcrumbs
      items={items}
      className={className}
      LinkComponent={({ to, children, className }) => (
        <Link to={to} className={className}>
          {children}
        </Link>
      )}
    />
  );
};
