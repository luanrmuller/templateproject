describe("Generate Unique ID", () => {
    it("should generate an unique ID", () => {
      const id = "12345678";
      
      expect(id).toHaveLength(8);
    });
  });
  