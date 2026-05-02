import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "@/components/Nav/Nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Nav", () => {
  it('renders the DWR logo link pointing to "/"', () => {
    render(<Nav />);
    // "DWR" appears in both the desktop nav and the mobile bar
    const logos = screen.getAllByText("DWR");
    expect(logos.length).toBeGreaterThanOrEqual(1);
    logos.forEach((logo) =>
      expect(logo.closest("a")).toHaveAttribute("href", "/")
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
