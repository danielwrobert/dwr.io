import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "@/components/Nav/Nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Nav", () => {
  it('renders the DWR logo link pointing to "/"', () => {
    render(<Nav />);
    const logo = screen.getByText("DWR");
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it('renders a Notebook link pointing to "/notebook"', () => {
    render(<Nav />);
    expect(screen.getByText("Notebook").closest("a")).toHaveAttribute(
      "href",
      "/notebook"
    );
  });

  it('renders an About link pointing to "/about"', () => {
    render(<Nav />);
    expect(screen.getByText("About").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
  });
});
