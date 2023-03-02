import { Item, RoseGarden } from "@/rose-garden";

describe("Rose Garden", () => {
  it("should foo", () => {
    const roseGarden = new RoseGarden([new Item("foo", 0, 0)]);
    const items = roseGarden.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});
describe("updateQuality", () => {
  it("decreases quality by 1 for normal items before sellIn date", () => {
    const item = new Item("Normal", 10, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.quality).toBe(9);
  });
});
