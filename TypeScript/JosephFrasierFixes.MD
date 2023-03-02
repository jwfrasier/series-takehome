# Joseph Frasier Rose Garden Fixes

Thanks for letting me work on this takehome. Super fun and definitely one that I hadn't seen before and it helped reinforce alot of ideas that are important in development.

# Method of fixing

I started with looking over the readme and understanding what the application was currently doing. It worked, it was already working, no need to reinvent the wheel. However HOW it was working was a different story.

First, I looked at the for loop. I know everyone loves the old school for loop and getting access to the _index_ is super useful, but this isn't a Google algorithm, we can change that easily to a `for..of` loop and replace all occurences of `this.items[i]` with `item.quality` inside a `for (const item of this.items)` loop.

Next, I examined how the code was written and noticed a ton of `if` and nested `if` staments. This already made it extremely confusing but can be understandable for certain things. The only problem is alot of these where just checking for negative equality. What item were were NOT on. It also had logic such as checking for quality or other items scattered all around. That was an easy area of improvement.

Second, I noticed no test were written aside from the initial one that was provided. I can retroactively write test AFTER I wrote my logic but this application is already working so lets write test that make sure it works the way described in the readme.

Finally, conditional statements had hardcoded string values in them. While this _works_ it doesn't mean it's easy to read and in my experience, leaves room for error very easily.

# FOR-get that for loop

Replace the indexed style older for loop with a `for(const item of this.items)` and replace all occurences of `this.items[i]` with `item.quality` or `item.sellIn`

# Item variables

First step to help clear this was creating variables that equaled the items we were expecting and replace them in their `if` statements.

# IF refactor

I refactored `if` statements to include what would happen if we were on the item, rather than if we were not. `if (item.name !== BRIE && item.name !== BACKSTAGE_PASSES)` could be refactored to `if (item.name === BRIE)` and then go from there. We also have certain nested if statements that could be refactored such as

```
if (this.items[i].sellIn < 6) {
 if (this.items[i].quality < 50)
```

can be refactored easily into `if (item.sellIn < 6 && item.quality < 50)`

# Test test test, is this thing on?

Write test. Seriously write test that test the conditions of what are app is doing FIRST. That way as I change my logic or start switching up the `if else` logic, I can understand when it's working because due to my test passing. Make sure the test are trying their best to test one thing only too.

# Conclusion

What's the best thing I can learn from this kata? It's that clarity and easy to read code speaks volumes to helping other people understand what is going on. Just because code works doesn't mean it's written well. Emphasis on testing, clearly documenting your code and simplifying logic is much better than clever code that only one person understands.
