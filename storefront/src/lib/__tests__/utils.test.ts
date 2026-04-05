import { formatPrice, formatPhone, validatePhone, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats zero", () => {
    expect(formatPrice(0)).toBe("0,000 TND");
  });

  it("formats a small amount", () => {
    expect(formatPrice(1000)).toBe("1,000 TND");
  });

  it("formats a typical product price", () => {
    expect(formatPrice(15900)).toBe("15,900 TND");
  });

  it("formats a large amount", () => {
    expect(formatPrice(105000)).toBe("105,000 TND");
  });

  it("formats amounts with sub-millime precision", () => {
    // 500 millimes = 0.500 TND
    expect(formatPrice(500)).toBe("0,500 TND");
  });

  it("formats single-digit millimes", () => {
    expect(formatPrice(1)).toBe("0,001 TND");
  });
});

describe("formatPhone", () => {
  it("formats an 8-digit local number", () => {
    expect(formatPhone("98123456")).toBe("+216 98 123 456");
  });

  it("formats an 11-digit number with 216 prefix", () => {
    expect(formatPhone("21698123456")).toBe("+216 98 123 456");
  });

  it("formats a number with +216 prefix", () => {
    expect(formatPhone("+21698123456")).toBe("+216 98 123 456");
  });

  it("formats a number with spaces", () => {
    expect(formatPhone("98 123 456")).toBe("+216 98 123 456");
  });

  it("returns unformatted string for non-standard lengths", () => {
    expect(formatPhone("123")).toBe("123");
  });
});

describe("validatePhone", () => {
  describe("valid numbers", () => {
    it("accepts +216 with 8 digits starting with valid prefix", () => {
      expect(validatePhone("+21698123456")).toBe(true);
    });

    it("accepts 216 prefix without +", () => {
      expect(validatePhone("21698123456")).toBe(true);
    });

    it("accepts 00216 prefix", () => {
      expect(validatePhone("0021698123456")).toBe(true);
    });

    it("accepts local 8-digit number", () => {
      expect(validatePhone("98123456")).toBe(true);
    });

    it("accepts numbers starting with 2", () => {
      expect(validatePhone("21234567")).toBe(true);
    });

    it("accepts numbers starting with 5", () => {
      expect(validatePhone("51234567")).toBe(true);
    });

    it("accepts numbers starting with 9", () => {
      expect(validatePhone("91234567")).toBe(true);
    });

    it("accepts numbers with spaces", () => {
      expect(validatePhone("+216 98 123 456")).toBe(true);
    });

    it("accepts numbers with dashes", () => {
      expect(validatePhone("+216-98-123-456")).toBe(true);
    });
  });

  describe("invalid numbers", () => {
    it("rejects numbers starting with 0", () => {
      expect(validatePhone("01234567")).toBe(false);
    });

    it("rejects numbers starting with 1", () => {
      expect(validatePhone("11234567")).toBe(false);
    });

    it("rejects too-short numbers", () => {
      expect(validatePhone("9812345")).toBe(false);
    });

    it("rejects too-long local numbers", () => {
      expect(validatePhone("981234567")).toBe(false);
    });

    it("rejects empty string", () => {
      expect(validatePhone("")).toBe(false);
    });

    it("rejects non-numeric input", () => {
      expect(validatePhone("abcdefgh")).toBe(false);
    });

    it("rejects wrong country prefix", () => {
      expect(validatePhone("+33698123456")).toBe(false);
    });
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });

  it("resolves complex Tailwind conflicts", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("handles empty call", () => {
    expect(cn()).toBe("");
  });
});
