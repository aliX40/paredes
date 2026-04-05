import { render, screen } from "@testing-library/react";
import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders 'Offre' label for offre tag", () => {
    render(<Badge tag="offre" />);
    expect(screen.getByText("Offre")).toBeInTheDocument();
  });

  it("renders 'Nouveau' label for nouveau tag", () => {
    render(<Badge tag="nouveau" />);
    expect(screen.getByText("Nouveau")).toBeInTheDocument();
  });

  it("renders 'Bundle' label for bundle tag", () => {
    render(<Badge tag="bundle" />);
    expect(screen.getByText("Bundle")).toBeInTheDocument();
  });

  it("applies accent style for offre tag", () => {
    render(<Badge tag="offre" />);
    expect(screen.getByText("Offre").className).toContain("bg-accent");
  });

  it("applies primary style for nouveau tag", () => {
    render(<Badge tag="nouveau" />);
    expect(screen.getByText("Nouveau").className).toContain("bg-primary");
  });

  it("applies warning style for bundle tag", () => {
    render(<Badge tag="bundle" />);
    expect(screen.getByText("Bundle").className).toContain("bg-warning");
  });

  it("merges custom className", () => {
    render(<Badge tag="offre" className="extra-class" />);
    expect(screen.getByText("Offre").className).toContain("extra-class");
  });
});
