import { describe, it, expect } from "vitest";
import {
  calculateVAT,
  calculateNetToGross,
  calculateGrossToNet,
  bankersRound,
  validateAmount,
  validateVATRate,
} from "@/lib/vat";

describe("VAT Calculations", () => {
  describe("bankersRound", () => {
    it("should round half to even", () => {
      expect(bankersRound(2.5)).toBe(2);
      expect(bankersRound(3.5)).toBe(4);
      expect(bankersRound(4.5)).toBe(4);
      expect(bankersRound(5.5)).toBe(6);
    });

    it("should round normally when not exactly half", () => {
      expect(bankersRound(2.4)).toBe(2);
      expect(bankersRound(2.6)).toBe(3);
      expect(bankersRound(3.3)).toBe(3);
      expect(bankersRound(3.7)).toBe(4);
    });

    it("should handle specified decimal places", () => {
      expect(bankersRound(2.345, 1)).toBe(2.3);
      expect(bankersRound(2.355, 1)).toBe(2.4);
      expect(bankersRound(2.365, 1)).toBe(2.4);
    });
  });

  describe("calculateNetToGross", () => {
    it("should correctly add 20% VAT", () => {
      const result = calculateNetToGross(100, 20);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(20);
      expect(result.grossAmount).toBe(120);
      expect(result.vatRate).toBe(20);
      expect(result.mode).toBe("net-to-gross");
    });

    it("should correctly add 19% VAT (Germany)", () => {
      const result = calculateNetToGross(100, 19);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(19);
      expect(result.grossAmount).toBe(119);
    });

    it("should correctly add 5.5% VAT (France reduced rate)", () => {
      const result = calculateNetToGross(100, 5.5);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(5.5);
      expect(result.grossAmount).toBe(105.5);
    });

    it("should handle decimal amounts", () => {
      const result = calculateNetToGross(123.45, 20);
      expect(result.netAmount).toBe(123.45);
      expect(result.vatAmount).toBe(24.69);
      expect(result.grossAmount).toBe(148.14);
    });

    it("should handle zero VAT rate", () => {
      const result = calculateNetToGross(100, 0);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(0);
      expect(result.grossAmount).toBe(100);
    });
  });

  describe("calculateGrossToNet", () => {
    it("should correctly remove 20% VAT", () => {
      const result = calculateGrossToNet(120, 20);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(20);
      expect(result.grossAmount).toBe(120);
      expect(result.vatRate).toBe(20);
      expect(result.mode).toBe("gross-to-net");
    });

    it("should correctly remove 19% VAT (Germany)", () => {
      const result = calculateGrossToNet(119, 19);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(19);
      expect(result.grossAmount).toBe(119);
    });

    it("should correctly remove 21% VAT (Netherlands)", () => {
      const result = calculateGrossToNet(121, 21);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(21);
      expect(result.grossAmount).toBe(121);
    });

    it("should handle decimal amounts", () => {
      const result = calculateGrossToNet(148.14, 20);
      expect(result.netAmount).toBe(123.45);
      expect(result.vatAmount).toBe(24.69);
      expect(result.grossAmount).toBe(148.14);
    });

    it("should handle zero VAT rate", () => {
      const result = calculateGrossToNet(100, 0);
      expect(result.netAmount).toBe(100);
      expect(result.vatAmount).toBe(0);
      expect(result.grossAmount).toBe(100);
    });
  });

  describe("calculateVAT", () => {
    it("should calculate net to gross", () => {
      const result = calculateVAT({
        amount: 100,
        vatRate: 20,
        mode: "net-to-gross",
      });
      expect(result.netAmount).toBe(100);
      expect(result.grossAmount).toBe(120);
      expect(result.vatAmount).toBe(20);
    });

    it("should calculate gross to net", () => {
      const result = calculateVAT({
        amount: 120,
        vatRate: 20,
        mode: "gross-to-net",
      });
      expect(result.netAmount).toBe(100);
      expect(result.grossAmount).toBe(120);
      expect(result.vatAmount).toBe(20);
    });

    it("should throw error for negative amount", () => {
      expect(() =>
        calculateVAT({
          amount: -100,
          vatRate: 20,
          mode: "net-to-gross",
        })
      ).toThrow("Amount cannot be negative");
    });

    it("should throw error for invalid VAT rate", () => {
      expect(() =>
        calculateVAT({
          amount: 100,
          vatRate: -5,
          mode: "net-to-gross",
        })
      ).toThrow("VAT rate must be between 0 and 100");

      expect(() =>
        calculateVAT({
          amount: 100,
          vatRate: 105,
          mode: "net-to-gross",
        })
      ).toThrow("VAT rate must be between 0 and 100");
    });
  });

  describe("validateAmount", () => {
    it("should validate correct amounts", () => {
      expect(validateAmount("100")).toEqual({ valid: true });
      expect(validateAmount("123.45")).toEqual({ valid: true });
      expect(validateAmount("0")).toEqual({ valid: true });
      expect(validateAmount("0.01")).toEqual({ valid: true });
    });

    it("should reject empty input", () => {
      expect(validateAmount("")).toEqual({
        valid: false,
        error: "Amount is required",
      });
      expect(validateAmount("  ")).toEqual({
        valid: false,
        error: "Amount is required",
      });
    });

    it("should reject non-numeric input", () => {
      expect(validateAmount("abc")).toEqual({
        valid: false,
        error: "Please enter a valid number",
      });
      expect(validateAmount("12.34.56")).toEqual({
        valid: false,
        error: "Please enter a valid number",
      });
    });

    it("should reject negative amounts", () => {
      expect(validateAmount("-100")).toEqual({
        valid: false,
        error: "Amount cannot be negative",
      });
    });

    it("should reject amounts that are too large", () => {
      expect(validateAmount("9999999999")).toEqual({
        valid: false,
        error: "Amount is too large",
      });
    });
  });

  describe("validateVATRate", () => {
    it("should validate correct VAT rates", () => {
      expect(validateVATRate(20)).toEqual({ valid: true });
      expect(validateVATRate(0)).toEqual({ valid: true });
      expect(validateVATRate(5.5)).toEqual({ valid: true });
      expect(validateVATRate(100)).toEqual({ valid: true });
    });

    it("should reject negative rates", () => {
      expect(validateVATRate(-5)).toEqual({
        valid: false,
        error: "VAT rate cannot be negative",
      });
    });

    it("should reject rates over 100%", () => {
      expect(validateVATRate(105)).toEqual({
        valid: false,
        error: "VAT rate cannot exceed 100%",
      });
    });
  });

  describe("Rounding edge cases", () => {
    it("should handle complex rounding scenarios", () => {
      // Test case that often causes rounding errors
      const result1 = calculateNetToGross(99.99, 20);
      expect(result1.vatAmount).toBe(20);
      expect(result1.grossAmount).toBe(119.99);

      // Reverse calculation should match
      const result2 = calculateGrossToNet(119.99, 20);
      expect(result2.netAmount).toBe(99.99);
    });

    it("should handle very small amounts", () => {
      const result = calculateNetToGross(0.01, 20);
      expect(result.vatAmount).toBe(0);
      expect(result.grossAmount).toBe(0.01);
    });

    it("should handle very large amounts", () => {
      const result = calculateNetToGross(999999, 20);
      expect(result.vatAmount).toBe(199999.8);
      expect(result.grossAmount).toBe(1199998.8);
    });
  });

  describe("Real-world scenarios", () => {
    it("should calculate French standard VAT (20%)", () => {
      const result = calculateNetToGross(1000, 20);
      expect(result.grossAmount).toBe(1200);
    });

    it("should calculate German standard VAT (19%)", () => {
      const result = calculateNetToGross(1000, 19);
      expect(result.grossAmount).toBe(1190);
    });

    it("should calculate Hungarian standard VAT (27%)", () => {
      const result = calculateNetToGross(1000, 27);
      expect(result.grossAmount).toBe(1270);
    });

    it("should calculate Luxembourg standard VAT (17%)", () => {
      const result = calculateNetToGross(1000, 17);
      expect(result.grossAmount).toBe(1170);
    });
  });
});
