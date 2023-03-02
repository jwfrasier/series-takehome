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
// Items go here
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
      // refactor for individual items and what we should do when we encounter those items, rather that
      // when we don't

      // logic for brie
      if (item.name === BRIE) {
        if (item.quality < 50) {
          item.quality++;
        }
        // logic for passes
      } else if (item.name === BACKSTAGE_PASSES) {
        if (item.quality < 50) {
          item.quality++;
          // concert in 10 days or less, increase quality
          if (item.sellIn < 11 && item.quality < 50) {
            item.quality++;
          }
          // concertin 5 days or less?, increase quality once more
          if (item.sellIn < 6 && item.quality < 50) {
            item.quality++;
          }
        }
      } else if (item.name === HAND) {
        // literally a legendary item, no need to make any changes because it's values never change
      } else {
        if (item.quality > 0) {
          item.quality--;
        }
      }
      //  cannot change the HAND code due to legendary status
      if (item.name !== HAND) {
        item.sellIn--;
      }

      // logic for sellIn once it goes past 0
      if (item.sellIn < 0) {
        // BRIE gets better with age
        if (item.name === BRIE) {
          if (item.quality < 50) {
            item.quality++;
          }
          // BACKSTAGE PASSES
          // no one wants to see a concert that already happened, set quality to 0
        } else if (item.name === BACKSTAGE_PASSES) {
          item.quality = 0;
          //  cannot change the HAND code due to legendary status
        } else if (item.name !== HAND) {
          // NORMAL ITEMS
          // decrease by 1 quality
          if (item.quality > 0) {
            item.quality--;
          }
        }
      }
    }

    return this.items;
  }
}
