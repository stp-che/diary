import * as chai from 'chai';
import * as Tags from '../src/lib/Tags';
const expect = chai.expect;

describe("Tags", () => {
  describe(".fetch", () => {
    it("returns list of tags found in given text", () => {
      expect(Tags.fetch("Сегодня все было хорошо")).to.be.an('array').that.is.empty;
      expect(Tags.fetch("#хорошо #отдых Сегодня все было хорошо")).to.have.lengthOf(2).and.include.members(["хорошо", "отдых"]);
      expect(Tags.fetch("#аб-в\n# Вступление\nСегодня все было хорошо")).to.have.lengthOf(1).and.include.members(["аб-в"]);
      expect(Tags.fetch("#a b c #d")).to.have.lengthOf(2).and.include.members(["a", "d"]);
      expect(Tags.fetch("#a\nb\nc\n#d")).to.have.lengthOf(2).and.include.members(["a", "d"]);
      expect(Tags.fetch("#a\tb\tc\t#d")).to.have.lengthOf(2).and.include.members(["a", "d"]);
      expect(Tags.fetch("a #b c #d e")).to.have.lengthOf(2).and.include.members(["b", "d"]);
      expect(Tags.fetch("##a")).to.be.an('array').that.is.empty;
    })
  })

  describe("replace", () => {
    it("replaces all tags in text with the results of given function", () => {
      expect(
        Tags.replace(
          "#хорошо #отдых Сегодня все было хорошо",
          (tag: string) => `<tag name="${tag}"></tag>`
        ),
       ).to.eq('<tag name="хорошо"></tag> <tag name="отдых"></tag> Сегодня все было хорошо');
    })
  })
})