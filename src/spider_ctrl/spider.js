import config from './../config';
import {
  SpiderTab,
  SpiderAjax
} from './../spider_proxy';
import util from './../util/util';
import handler from './handler';


export default new class {
  /**
   * 1. 抓取tab
   * 2. 通过archivesUrls, 用ajax抓取items
   * 3. 将item存入mongodb
   */
  scratch = async () => {
    const tabs = await SpiderTab.scratch(config.uri);
    for (const tab of tabs) {
      const archivesUrls = util.getArchivesUrls(tab);

      for (const archiveUrl of archivesUrls) {
        const result = SpiderAjax.scratch(archiveUrl);
        handler.handle(result);
        await util.sleep(1000);
      }
    }
  }
};
