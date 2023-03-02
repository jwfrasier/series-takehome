export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const BRIE: string = "Aged Brie";
const BACKSTAGE_PASSES: string = "Backstage passes to a TAFKAL80ETC concert";
const HAND: string = "Sulfuras, Hand of Ragnaros";

export class RoseGarden {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      // so if it's not brie and the passes, and the hand, it's a normal item
      if (item.name !== BRIE && item.name !== BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          if (item.name !== HAND) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        // item quality can't go over 50
        if (item.quality < 50) {
          item.quality++;
          // backstage pass logic
          if (item.name == BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
          }
        }
      }
      if (item.name !== HAND) {
        item.sellIn--;
      }
      if (item.sellIn < 0) {
        if (item.name === BRIE) {
          if (item.quality < 50) {
            item.quality++;
          }
        } else if (item.name === BACKSTAGE_PASSES) {
          item.quality = 0;
        } else if (item.name !== HAND) {
          if (item.quality > 0) {
            item.quality--;
          }
        }
      }
    }

    return this.items;
  }
}
