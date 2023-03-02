import { Item, RoseGarden } from "@/rose-garden";

const BRIE: string = "Aged Brie";
const BACKSTAGE_PASSES: string = "Backstage passes to a TAFKAL80ETC concert";
const HAND: string = "Sulfuras, Hand of Ragnaros";

describe("Rose Garden", () => {
  it("should foo", () => {
    const roseGarden = new RoseGarden([new Item("foo", 0, 0)]);
    const items = roseGarden.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});
describe("updateQuality", () => {
  it("decreases quality by 1 for normal items before sellIn date", () => {
    const item = new Item("Normal Item", 10, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.quality).toBe(9);
  });

  it("decrease the quality by 2 if normal items are past their sellIn date", () => {
    const item = new Item("Normal Item", 0, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.quality).toBe(8);
  });
  it("should not decrease the quality value of a normal item below 0", () => {
    const item = new Item("Normal Item", 0, 0);
    const garden = new RoseGarden([item]);
    garden.updateQuality();
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });
  it("should not increase Aged Brie above a quality of 50", () => {
    const item = new Item(BRIE, 5, 50);
    const garden = new RoseGarden([item]);
    garden.updateQuality();
    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(50);
  });
  it("should increase quality of Aged Brie the older it gets", () => {
    const item = new Item(BRIE, 5, 30);
    const garden = new RoseGarden([item]);
    garden.updateQuality();
    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(31);
  });
  it("increases the quality of Backstage passes by 2 with 10 days or less to the concert", () => {
    const item = new Item(BACKSTAGE_PASSES, 9, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.sellIn).toEqual(8);
    expect(item.quality).toEqual(12);
  });

  it("increases the quality of Backstage passes by 3 with 5 days or less to the concert", () => {
    const item = new Item(BACKSTAGE_PASSES, 5, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.sellIn).toEqual(4);
    expect(item.quality).toEqual(13);
  });
  it("sets the quality of Backstage passes to 0 after the concert", () => {
    const item = new Item(BACKSTAGE_PASSES, 0, 10);
    const roseGarden = new RoseGarden([item]);
    roseGarden.updateQuality();
    expect(item.sellIn).toEqual(-1);
    expect(item.quality).toEqual(0);
  });
  it("should not decrease the quality or sellIn of Sulfuras", () => {
    const sulfuras = new Item(HAND, 10, 80);
    const roseGarden = new RoseGarden([sulfuras]);
    roseGarden.updateQuality();
    expect(sulfuras.sellIn).toEqual(10);
    expect(sulfuras.quality).toEqual(80);
  });
});
