export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // Skip Sulfuras, Hand of Ragnaros, it does not change
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }
      // Decrease sellIn, it is a common property
      item.sellIn -= 1;

      // Update quality based on item type
      if (item.name === 'Aged Brie') {
        if (item.quality < 50) {
          item.quality += 1;
        }
        if (item.sellIn < 0 && item.quality < 50) {
          item.quality += 1;
        }
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 0) {
          item.quality = 0;
        } else if (item.sellIn < 5) {
          item.quality = Math.min(item.quality + 3, 50);
        } else if (item.sellIn < 10) {
          item.quality = Math.min(item.quality + 2, 50);
        } else {
          item.quality = Math.min(item.quality + 1, 50);
        }
      } else {
        let degradeRate = 1;
        if (item.name.startsWith('Conjured')) {
          degradeRate = 2;
        }
        if (item.sellIn < 0) {
          degradeRate *= 2;
        }
        item.quality = Math.max(item.quality - degradeRate, 0);
      }
    }

    return this.items;
  }
}
