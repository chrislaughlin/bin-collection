import * as cheerio from 'cheerio';

const BIN_ENDPOINT = 'https://online.belfastcity.gov.uk/find-bin-collection-day/Default.aspx';

export async function getBinInformation() {
  try {
    const response = await fetch("https://online.belfastcity.gov.uk/find-bin-collection-day/Default.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://online.belfastcity.gov.uk/find-bin-collection-day/Default.aspx",
      "body": "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUJOTk1NTQwMTc2D2QWAmYPZBYCAgMPZBYCAgUPZBYCAgEPZBYCAgEPZBYCAgEPZBYIAgUPD2QWAh4Fc3R5bGUFDGRpc3BsYXk6bm9uZRYCAgsPD2QWAh8ABQxkaXNwbGF5Om5vbmVkAgcPD2QWAh8ABQxkaXNwbGF5Om5vbmUWAgIHDw8WAh4HVmlzaWJsZWhkZAIJDw8WAh8BZ2QWBAIDDxAPFgYeDURhdGFUZXh0RmllbGQFDkJFTEZBU1RBRERSRVNTHg5EYXRhVmFsdWVGaWVsZAUEVVBSTh4LXyFEYXRhQm91bmRnZBAVLiQ0OSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNTEgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDUzIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ1NSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNTcgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDU5IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ2MSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNjMgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDY1IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ2NyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNjkgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDcwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3MSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzIgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDczIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3NCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzUgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDc2IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3NyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzggRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDc5IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4MCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODEgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDgyIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4MyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODQgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDg1IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4NiBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODcgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDg4IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4OSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkOTAgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDkyIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ5NCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkOTYgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDk4IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMDAgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTEwMiBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTA0IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMDYgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTEwOCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTEwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMTIgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTExNCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTE2IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUilTZWxlY3QgdGhlIEJUNyAySFIgYWRkcmVzcyBmcm9tIHRoZSBsaXN0LhUuCTE4NTA1NTE3OAkxODUwNTUxNzkJMTg1MDU1MTgwCTE4NTA1NTE4MQkxODUwNTUxODIJMTg1MDU1MTgzCTE4NTA1NTE4NAkxODUwNTUxODUJMTg1MDU1MTg2CTE4NTA1NTE4NwkxODUwNTUxODgJMTg1MDU1MTg5CTE4NTA1NTE5MAkxODUwNTUxOTEJMTg1MDU1MTkyCTE4NTA1NTE5MwkxODUwNTUxOTQJMTg1MDU1MTk1CTE4NTA1NTE5NgkxODUwNTUxOTcJMTg1MDU1MTk4CTE4NTA1NTE5OQkxODUwNTUyMDAJMTg1MDU1MjAxCTE4NTA1NTIwMgkxODUwNTUyMDMJMTg1MDU1MjA0CTE4NTA1NTIwNQkxODUwNTUyMDYJMTg1MDU1MjA3CTE4NTA1NTIwOAkxODUwNTUyMDkJMTg1MDU1MjEwCTE4NTA1NTIxMQkxODUwNTUyMTIJMTg1MDU1MjEzCTE4NTA1NTE2OQkxODUwNTUxNzAJMTg1MDU1MTcxCTE4NTA1NTE3MgkxODUwNTUxNzMJMTg1MDU1MTc0CTE4NTA1NTE3NQkxODUwNTUxNzYJMTg1MDU1MTc3KVNlbGVjdCB0aGUgQlQ3IDJIUiBhZGRyZXNzIGZyb20gdGhlIGxpc3QuFCsDLmdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2cWAQItZAIHD2QWAgIFDw9kFgIfAAUMZGlzcGxheTpub25lZAILD2QWCgIBDw8WAh4EVGV4dGVkZAIDD2QWAgIBDzwrABECAA8WCB8BaB4HQ2FwdGlvbgUlMTAwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUh8EZx4LXyFJdGVtQ291bnQCAWQMFCsABBYIHgROYW1lBQtUeXBlIG9mIGJpbh4KSXNSZWFkT25seWgeBFR5cGUZKwIeCURhdGFGaWVsZAULVHlwZSBvZiBiaW4WCB8IBQdEYXkocykgHwloHwoZKwIfCwUHRGF5KHMpIBYIHwgFCkhvdyBvZnRlbj8fCWgfChkrAh8LBQpIb3cgb2Z0ZW4%2FFggfCAUPTmV4dCBjb2xsZWN0aW9uHwloHwoZKwIfCwUPTmV4dCBjb2xsZWN0aW9uFgJmD2QWBAIBD2QWCGYPDxYCHwUFEUdlbmVyYWwgd2FzdGUgYmluZGQCAQ8PFgIfBQUHIE1vbmRheWRkAgIPDxYCHwUFC0ZvcnRuaWdodGx5ZGQCAw8PFgIfBQUQTW9uIE5vdiAxMCAyMDI1IGRkAgIPDxYCHwFoZGQCBQ8PFgIfBWVkZAIHDw8WAh8BaGRkAgkPDxYCHwFoZGQYAQUbY3RsMDAkTWFpbkNvbnRlbnQkSXRlbXNHcmlkDzwrAAwBCAIBZBojgMEyjBvM6BSxtw1RpBr%2FAbRpo%2FFnrgueUSTx3iR7&__VIEWSTATEGENERATOR=B86EC514&__SCROLLPOSITIONX=0&__SCROLLPOSITIONY=291&__EVENTVALIDATION=%2FwEdADmUp2RqyRtWh1dSjyYul1mfAdF4my8wK0n8FBl7n97nB0JAz6GInHkOUgMygXFvujALnzJukxy5z5sDvzLjJnzBRHFBg3o8kAwQkLFDTFWp3sBskwNxLrkXDyq0rofyci38Jg7zKnm6fnlgWhN7wheliWsIRVrWHpb5f6uqGuAfKWlhFyRwUKQX7s04VyGZXPCNssR2qr6dUPGwSrKR00ndZBdt0VoQg%2B6N5avaI%2FHEL%2FrppqWhJq4oXeatgzDu%2FG0McQDsHu%2FWDeNOBscaEbLrSYC3HZNF1UXurfZU4mTWDeamFZqHUyPW%2BfVZQ5louIAC1NajuiVJWV%2BcWlXuDVwxbo%2FfhMNTEevemvfoDOm4L0amKZFIaMnBhXA9OHSE64kzDzDkVAAPC1uPTN3ShW%2Bw6MW2IBecuy1Je61DcGHlxxwgV9urGjQUA5HeqfFo%2FbQQFY%2FDZQ1RMyEQoXxXi0%2F2z3g%2FJiaZo8RZm7XF3h0mrvJzWnzBEzkba4ypxiTnN9sUY5ZL0L1ggoWAr5qa%2FUgbEJXkf0v2FGJtCuOEpmwCz6hWGfP%2BqTqjvBebHL%2BjmVuPSP%2FP27nGHj2l3QQmbhCqC5hc7rwtBTZcuHzqz8jPkcCD1WZAhTLC2q46uhY%2Fba9I7O0%2BY0QsBrCVWNOr0vkr4K%2FC%2BZ0q2EwJ88Rmu7Bmfccudabozj4968A0cpFjB2QNG4lcl6q%2F0jxsCIyZL5idxhXTPt9%2BPRwcdTeosMN8pyP6we%2BvhbZ8%2FNWCy2F7AEOaVkziyWTkebxFwgszkU%2FNeQ9hLWlZdZM2ckljtnQyBXKBzeXlyS5ZIvVGTHix%2BWA73IonisSB%2Ff58y3iqbhPohX3RZa5jux1cdHlnYDSK7MElxviTXvG2WpE%2FG3IOOM0fx6MPnM6BlUsPhCwUeaseU10N4picoC4glx0Q1%2F%2FUCDqYLYe6YY9zxK2hGx0Jnb0Qs2qo0%2BxGQKfvzncs6xo6qbbFgEQaMGZp5CzFjh%2B%2B1Xwe7jDB2J34GpLvkla8eYBE%2FDeiqbqlAw3Malj%2FuxfTnZKTjYTkB3cYJtrTT4AU8pwWN2%2Bx08o79dPuZZB93%2FKKbgc%2BAJ%2BcYEat3uDCO2nOX5BJPba7n4%2Bd59tPN6I0acrSrPBOlpw9r8wnuJg2YimmdR3UaSJECFtlL%2FhV97X6J95pF0zcb2F%2FfcDVpBxRnii3n2AV7U6lJeTmRN2CXZbjPf0Q7Rzz1u3dkShO%2FLr2%2BIjJ7yjEWfD5kL7rSQJK3Q%3D%3D&ctl00%24MainContent%24searchBy_radio=P&ctl00%24MainContent%24Street_textbox=&ctl00%24MainContent%24Postcode_textbox=BT7+2HR&ctl00%24MainContent%24lstAddresses=185055169&ctl00%24MainContent%24SelectAddress_button=Select+address",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    if (!response.ok) {
      throw new Error(`Remote request failed with status ${response.status}`);
    }

    const html = await response.text();

    // console.log(html);

    const $ = cheerio.load(html);

    console.log($('title').text());
    
    const table = $('#ItemsGrid > tbody > tr:nth-child(2) > td:nth-child(1)')

    const binType = table.text().trim();
    console.log('Table contents:', binType);

    // const binType = getUpcomingBinsFromHtml(html);
    // console.log('Upcoming bins:', binType);

    return { status: 'success', binType: binType };
  } catch (error) {
    console.error('Failed to fetch bin information:', error);
    return {
      status: 'error',
      message: 'Bin bots are snoozing. Try again soon!',
    };
  }
}


function getUpcomingBinsFromHtml(html) {
  // Build a DOM from the HTML string (works in browsers; falls back if DOMParser is missing)
  let doc;
  if (typeof DOMParser !== 'undefined') {
    doc = new DOMParser().parseFromString(html, 'text/html');
  } else {
    // fallback for very old environments with a global document
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    doc = wrapper;
  }

  const atMidnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  // Get all table rows, skipping the header
  const rowNodes = Array.from(doc.querySelectorAll('#ItemsGrid tbody tr'));
  if (!rowNodes.length) return [];

  const dataRows = rowNodes.slice(1); // first row is headers

  const items = dataRows.map(tr => {
    const tds = tr.querySelectorAll('td');
    const type = tds[0]?.textContent.trim() || '';
    const days = tds[1]?.textContent.trim() || '';
    const frequency = tds[2]?.textContent.trim() || '';
    const nextStr = (tds[3]?.textContent || '').trim().replace(/\s+/g, ' ');

    // Try parsing formats like "Mon Nov 10 2025"
    let nextDate = new Date(nextStr);
    if (isNaN(nextDate)) {
      // Fallback: remove leading DOW (e.g. "Mon ")
      const noDow = nextStr.replace(/^[A-Za-z]{3}\s+/, '');
      nextDate = new Date(noDow);
    }

    return {
      type,
      days,
      frequency,
      nextStr,
      nextDate,
      valid: !isNaN(nextDate)
    };
  }).filter(x => x.valid);

  if (!items.length) return [];

  const today = atMidnight(new Date());

  // Prefer dates today or in the future; if none, use all and still pick the minimum
  const withDayOnly = arr => arr.map(x => ({ ...x, dayOnly: atMidnight(x.nextDate) }));
  const upcoming = withDayOnly(items).filter(x => x.dayOnly >= today);
  const pool = upcoming.length ? upcoming : withDayOnly(items);

  const minTime = Math.min(...pool.map(x => x.dayOnly.getTime()));
  return pool.filter(x => x.dayOnly.getTime() === minTime).map(({ dayOnly, valid, ...rest }) => rest);
}

/** Convenience: just the bin names (e.g. ["General waste bin"]) */
function getUpcomingBinNamesFromHtml(html) {
  return getUpcomingBinsFromHtml(html).map(x => x.type);
}


