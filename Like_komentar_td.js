const axios = require('axios');
const readline = require('readline');
const fs = require('fs')

let liked_id = []
let stopRequested = false;
let payload = {
    'av': '',
    'hs': '',
    'js': '',
    'lsd': '',
    'dtsg': '',
    'spr': '',
    'spt': '',
    'hsi': '',
    'com': '',
    'mid': '',
    'ig_did': ''
}
process.on('SIGINT', () => {
    console.log('\n[!] Ctrl + C terdeteksi! Menghentikan proses pengambilan data...');
    stopRequested = true;
});

function input(promptText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(promptText, (jawaban) => {
            rl.close();
            resolve(jawaban);
        });
    });
};

async function Zhfna(delai) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Selesai setelah ${delai} ms`);
        }, delai);
    });
}

async function LikeYou(zhf, kuki) {
    try {
        const response = await axios.post(
            'https://www.threads.com/api/graphql',
            new URLSearchParams({
                'av': payload.av,
                '__user': '0',
                '__a': '1',
                '__req': '4n',
                '__hs': payload.hs,
                'dpr': '1',
                '__ccg': 'GOOD',
                '__rev': payload.spr,
                '__s': '7n0nj9:jdarqr:6e58zq',
                '__hsi': payload.hsi,
                '__dyn': '7xeUmwlEnwn8K2Wmh0no6u5U4e0yoW3q32360CEbo1nEhw2nVE4W0qa0FE2awgo9oO0n24oaEd82lwv89k2C1Fwc60D85m1mzXwae4UaEW0Loco5G0zK5o4q0HU1IEGdwtU2ewbS1LwTwKG0hq1Iwqo9EpwUwiQ1mwLwHxW17y9UjgbVE-0UE5O1tK1Uw',
                '__csr': 'gP2ldF9sDifEJjmIT9FifXFR9__Rlph9oGWzKArVLQiazEC7uaGegCqi_CjWg01pCoy5E0gz1iEixV0yg5y5Q1Ixa1M8m8n29A0LU9411wix01rpih2yEx1q0kCAmUC8Cg7WU0gTw8C0GU5KqU8E-0km1kw6nxC0lIaVNqwlk3ry8KOG5OwBwb90du0_E3pQ0su7otwwwyxj4jximcF1u2YxrAgEkYUto12ogwQg0VF0-waR0b3cUy274008SypoV0',
                '__hsdp': 'gaAAGRbfAM4U2gzMMghIIUaNoZ9awOxVkyAiOgI8S8Ek9hpERqgKdlcIaI26gUE8248DegjwG7z42c-gE8Um5Mh5qga9B8IgXmES2ho2Yno8E7W78ee1iy2DwhogwzwxDBx2awMzA7osU2GwJwLwyQ78bEhCg1NEpw',
                '__hblpi': '05dwm838wAwrobomK3GdwMwi8ap8c8G9xu2nw248J0jo5Wm48G32egeE3qwLwgEbEhCg1NE',
                '__hblpn': '0v983vBgkx-dxx0xwCg420R8pwOwq8W18wNUc83qwem0kOu48y4VqzUcEbovxK4WxGfK788EdEdU881Z8',
                '__comet_req': payload.com,
                'fb_dtsg': payload.dtsg,
                'jazoest': payload.js,
                'lsd': payload.lsd,
                '__spin_r': payload.spr,
                '__spin_b': 'trunk',
                '__spin_t': payload.spt,
                '__jssesw': '2',
                '__crn': 'comet.threads.BarcelonaPostColumnRoute',
                'fb_api_caller_class': 'RelayModern',
                'fb_api_req_friendly_name': 'useBarcelonaLikeMutationLikeMutation',
                'variables': '{"mediaID":"' + zhf + '"}',
                'server_timestamps': 'true',
                'doc_id': '24068295876148027'
            }),
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'origin': 'https://www.threads.com',
                    'priority': 'u=1, i',
                    'referer': 'https://www.threads.com/@johnep12/post/DJF0ttiO--I',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"19.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
                    'x-asbd-id': '359341',
                    'x-csrftoken': 'bogPmK253pienI9L9K4xvfGIm7d2hJbT',
                    'x-fb-friendly-name': 'useBarcelonaLikeMutationLikeMutation',
                    'x-fb-lsd': 'nuQYukKd-tzVzgWatCoC0h',
                    'x-ig-app-id': '238260118697367',
                    'cookie': kuki
                }
            }
        );
        if (response.data.data.record.media.has_liked) {
            console.log(`[+] Liked ${zhf}`);
        }
    } catch (er) {
        console.log(`[!] Failed ${zhf}`);
    }
};


async function DumpData(cookie, postid, next) {
    if (stopRequested) {
        console.log('[x] Proses dihentikan oleh pengguna.');
        return;
    }
    try {
        const response = await axios.post(
            'https://www.threads.com/graphql/query',
            new URLSearchParams({
                'av': payload.av,
                '__user': '0',
                '__a': '1',
                '__req': '11',
                '__hs': payload.hs,
                'dpr': '1',
                '__ccg': 'GOOD',
                '__rev': payload.spr,
                '__s': 'keoukx:jdarqr:upod8x',
                '__hsi': payload.hsi,
                '__dyn': '7xeUmwlEnwn8K2Wmh0no6u5U4e0yoW3q32360CEbo1nEhw2nVE4W0qa0FE2awgo9oO0n24oaEd82lwv89k2C1Fwc60D85m1mzXwae4UaEW0Loco5G0zK5o4q0HU1IEGdwtU2ewbS1LwTwKG0hq1Iwqo9EpwUwiQ1mwLwHxW17y9UjgbVE-0UE5O1tK1Uw',
                '__csr': 'gP2ldF9sDifEJjmIT9FifXFH9-nRlpjVoW4WglVoG68aGzA9yX-pfF005Cpy8mw12c5axa7A290m8ng6O4E70xoxs8Cg2_wAg461a405JB94aay45E1iqhryoyp0vHw13u0yo2HwmVHwyzU1ho5i0pu6o1mMHD5G1lgdK8yXaEna2m0IA0RU3-wdDg1NUtxS222a5che59oOA5UbO5Kh2xjPxRw49x23h03CA3W0Hk0IcPy88sg00zq9BzA',
                '__hsdp': 'gaAAGRbfAM4U2gxgMgkOPwH5zQAG3a7Biahb92MzoyxgB5CzlF2URkOMGM8p3yww8gysV1e2Eucg8PUb8m5Mh5qga9B8IgUnwAweC0CU2dy2DwhogwzwxDBxK32egtwfu2-2bgswKw7ww',
                '__hblpi': '05dwm838wAwrobomK3Gdwuoap8c8G9xu08UyQ1dwnForwMzA0hm2-12wKw7ww',
                '__hblpn': '0v983vBgkx-dxx0xwCg420R8pwOwq8W18wNU12U0zau48y4VqzUcEbovxK4WxGfK782hwww7Qw',
                '__comet_req': payload.com,
                'fb_dtsg': payload.dtsg,
                'jazoest': payload.jazo,
                'lsd': payload.lsd,
                '__spin_r': payload.spr,
                '__spin_b': 'trunk',
                '__spin_t': payload.spt,
                '__jssesw': '2',
                '__crn': 'comet.threads.BarcelonaPostColumnRoute',
                'fb_api_caller_class': 'RelayModern',
                'fb_api_req_friendly_name': 'BarcelonaPostPageRefetchableDirectQuery',
                'variables': '{"after":"' + next + '","before":null,"first":4,"is_logged_in":true,"last":null,"postID":"' + postid + '","sort_order":"TOP","__relay_internal__pv__BarcelonaIsLoggedInrelayprovider":true,"__relay_internal__pv__BarcelonaHasSelfReplyContextrelayprovider":false,"__relay_internal__pv__BarcelonaShouldShowFediverseM1Featuresrelayprovider":true,"__relay_internal__pv__BarcelonaIsSearchDiscoveryEnabledrelayprovider":false,"__relay_internal__pv__BarcelonaOptionalCookiesEnabledrelayprovider":true,"__relay_internal__pv__BarcelonaHasSpoilerStylingInforelayprovider":false,"__relay_internal__pv__BarcelonaQuotedPostUFIEnabledrelayprovider":false,"__relay_internal__pv__BarcelonaIsCrawlerrelayprovider":false,"__relay_internal__pv__BarcelonaHasDisplayNamesrelayprovider":false,"__relay_internal__pv__BarcelonaCanSeeSponsoredContentrelayprovider":true,"__relay_internal__pv__BarcelonaShouldShowFediverseM075Featuresrelayprovider":true,"__relay_internal__pv__BarcelonaIsInternalUserrelayprovider":false,"__relay_internal__pv__BarcelonaInlineComposerEnabledrelayprovider":false}',
                'server_timestamps': 'true',
                'doc_id': '9762565803835397'
            }),
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'origin': 'https://www.threads.com',
                    'priority': 'u=1, i',
                    'referer': 'https://www.threads.com/@johnep12/post/DJF0ttiO--I',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"19.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
                    'x-asbd-id': '359341',
                    'x-bloks-version-id': 'cf39c6377e026a1760665d37cfc1b31a93ae150e5d202da0aa6d36af9f0749fd',
                    'x-csrftoken': 'bogPmK253pienI9L9K4xvfGIm7d2hJbT',
                    'x-fb-friendly-name': 'BarcelonaPostPageRefetchableDirectQuery',
                    'x-fb-lsd': '8FTI6MECga2XsQUPNKMg26',
                    'x-ig-app-id': '238260118697367',
                    'x-root-field-name': 'xdt_api__v1__text_feed__media_id__replies__connection',
                    'cookie': cookie
                }
            }
        );
        const items = response.data.data.data;
        const next_page = items.page_info.has_next_page;
        const next_cursor = items.page_info.end_cursor;
        if (!items) {
            console.log('[!] Komentar tidak di temukan');
            return;
        }

        for (const zsna of items.edges) {
            const threads_items = zsna.node.thread_items;
            for (const post_ of threads_items) {
                liked_id.push(post_.post.pk);
                process.stdout.write(`[+] Collected IDs: ${liked_id.length}\r`);
            }
        }
        if (next_page) {
            await DumpData(cookie, postid, next_cursor);
        }
        return;
    } catch (er) {
        return;
    }
};

async function Postid(url) {
    const response = await axios.get(url, {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
            'cache-control': 'max-age=0',
            'dpr': '1',
            'priority': 'u=0, i',
            'referer': 'https://www.instagram.com/',
            'sec-ch-prefers-color-scheme': 'dark',
            'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
            'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"19.0.0"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
            'viewport-width': '573',
        }
    });
    const uid = response.data.match(/{"postID":"(\d+)"/);
    if (uid) {
        return uid[1];
    }
    console.log('[!] UID tidak di temukan ');
};

async function Webthreads(params) {
    const response = await axios.get('https://www.threads.com/web', {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
            'dpr': '1',
            'priority': 'u=0, i',
            'sec-ch-prefers-color-scheme': 'dark',
            'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
            'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"19.0.0"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
            'viewport-width': '750',
            'cookie': params
        }
    });
    const av = response.data.match(/actorID":"(\d+)"/)?.[1];
    const lsd = response.data.match(/\["LSD",\[\],\{"token":"([^"]+)"/)?.[1];
    const dtsg_token = response.data.match(/\["DTSGInitialData",\[\],\{"token":"([^"]+)"/)?.[1];
    const haste = response.data.match(/"haste_session":"(.*?)"/)?.[1]
    const spin_r = response.data.match(/"__spin_r":(\d+),/)?.[1]
    const spin_t = response.data.match(/"__spin_t":(\d+),/)?.[1]
    const jazo = response.data.match(/jazoest=(\d+)",/)?.[1]
    const comet = response.data.match(/__comet_req=(\d+)/)?.[1]
    const hsi = response.data.match(/"hsi":"(\d+)",/)?.[1]
    const mid = response.data.match(/"machine_id":"(.*?)"/)?.[1];
    const ig_did = response.data.match(/{"device_id":"([^"]+)"/)?.[1].split('|')?.[2];
    payload.av = av;
    payload.hs = haste;
    payload.js = jazo;
    payload.lsd = lsd;
    payload.dtsg = dtsg_token;
    payload.spr = spin_r;
    payload.spt = spin_t;
    payload.hsi = hsi;
    payload.com = comet;
    payload.mid = mid;
    payload.ig_did = ig_did;

    // fs.writeFileSync('tes.txt',response.data)
};

async function GasLike(kukis) {
    await Webthreads(kukis);
    const cookies = `ig_did=${payload.ig_did}; mid=${payload.mid}; ps_l=1; ps_n=1; ${kukis}`
    const tautan = await input('[>] Link target : ')
    const data_id = await Postid(tautan)
    await DumpData(cookies, data_id, '')
    const delai = await input('\n[?] Delai berapa detik : ')
    for (const zhafarna of liked_id) {
        await LikeYou(zhafarna, cookies);
        await Zhfna(parseInt(delai) * 1000);
    }
};

async function LoginCresdinal(username, password, secret) {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await axios.post(
            'https://www.threads.com/api/v1/web/accounts/login/ajax/',
            new URLSearchParams({
                'can_threads_signup_with_ig': 'false',
                'enc_password': `#PWD_BROWSER:0:${timestamp}:${password}`,
                'optIntoOneTap': 'false',
                'queryParams': '{}',
                'stopDeletionNonce': '',
                'textAppStopDeletionToken': '',
                'username': username,
                'jazoest': '22000'
            }),
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'origin': 'https://www.threads.com',
                    'priority': 'u=1, i',
                    'referer': 'https://www.threads.com/login',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"19.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
                    'x-asbd-id': '359341',
                    'x-bloks-version-id': 'cf39c6377e026a1760665d37cfc1b31a93ae150e5d202da0aa6d36af9f0749fd',
                    'x-csrftoken': 'u6olMVHSu9dMczNkWyUMDa',
                    'x-ig-app-id': '238260118697367',
                    'x-instagram-ajax': '0',
                    'cookie': 'ig_did=0468D2FD-3A9E-4CE8-AFB8-F228015E986F; mid=aAuYZgALAAE2MFMJzqC0Hu-LhjwP; ps_l=1; ps_n=1; csrftoken=u6olMVHSu9dMczNkWyUMDa'
                },
                validateStatus: function (status) {
                    return status < 500;
                }
            }
        );
        const abcd = response.data;
        if (abcd.two_factor_required) {
            const identifier = abcd.two_factor_info.two_factor_identifier;
            const devicesId = abcd.device_id;
            const verifier_code = await GetVerificationCode(secret.replaceAll(' ', ''));
            await ValidateA2f(identifier, username, verifier_code, devicesId);
        } else if (abcd.userId) {
            function extractCookies(setCookieArray) {
                return setCookieArray
                    .map(cookieStr => cookieStr.split(';')[0])
                    .join('; ');
            }

            const cookie = extractCookies(response.headers['set-cookie']);
            await GasLike(cookie);
        } else {
            console.log(`[!] Login failed, respon instagram ${abcd}`);
        }

    } catch (e) {
        // console.error('Error:', e.message);
    }
};

async function GetVerificationCode(secret) {
    try {
        console.log(secret)
        const response = await axios.get(`https://2fa.live/tok/${secret}`, {
            headers: {
                'accept': '*/*',
                'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                'if-none-match': 'W/"12-CKuWeI1TafRaHKZTKHxkNpW7/5E"',
                'priority': 'u=1, i',
                'referer': 'https://2fa.live/',
                'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
                'x-requested-with': 'XMLHttpRequest',
                'cookie': '_gcl_au=1.1.852861105.1740733590; _gid=GA1.2.1940908409.1746159580; _ga_R2SB88WPTD=GS1.1.1746159580.5.0.1746159580.0.0.0; _ga=GA1.1.1238530047.1740733591'
            }
        });
        return response.data.token;
    } catch (e) {
        console.log(e)
    }

}
async function ValidateA2f(identifier_user, username, verifi_code, devices) {
    try {
        const response = await axios.post(
            'https://www.threads.com/api/v1/web/accounts/login/ajax/two_factor/',
            new URLSearchParams({
                'identifier': identifier_user,
                'queryParams': '{}',
                'trust_signal': 'false',
                'username': username,
                'verification_method': '3',
                'verificationCode': verifi_code,
                'deviceId': devices,
                'jazoest': '22000'
            }),
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'origin': 'https://www.threads.com',
                    'priority': 'u=1, i',
                    'referer': 'https://www.threads.com/login',
                    'sec-ch-prefers-color-scheme': 'dark',
                    'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
                    'sec-ch-ua-full-version-list': '"Microsoft Edge";v="135.0.3179.98", "Not-A.Brand";v="8.0.0.0", "Chromium";v="135.0.7049.115"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"19.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
                    'x-asbd-id': '359341',
                    'x-bloks-version-id': 'cf39c6377e026a1760665d37cfc1b31a93ae150e5d202da0aa6d36af9f0749fd',
                    'x-csrftoken': 'u6olMVHSu9dMczNkWyUMDa',
                    'x-ig-app-id': '238260118697367',
                    'x-instagram-ajax': '0',
                    'cookie': 'ig_did=0468D2FD-3A9E-4CE8-AFB8-F228015E986F; mid=aAuYZgALAAE2MFMJzqC0Hu-LhjwP; ps_l=1; ps_n=1; csrftoken=u6olMVHSu9dMczNkWyUMDa'
                }
            }
        );
        if (response.data.userId) {
            function extractCookies(setCookieArray) {
                return setCookieArray
                    .map(cookieStr => cookieStr.split(';')[0])
                    .join('; ');
            }

            const cookie = extractCookies(response.headers['set-cookie']);
            await GasLike(cookie);
        } else {
            console.log(`[!] kemungkinan terdeteksi spam ${response.data}`);
        }
    } catch (e) {
    }
};


async function First() {

    const username = await input('[?] Username : ')
    const password = await input('[?] Password : ')
    const secret_auth = await input('[?] Secret Authentikasi : ')
    await LoginCresdinal(username,password,secret_auth);

};

console.log(`

    ╦  ┬┬┌─┌─┐┌┬┐
    ║  │├┴┐├┤  ││
    ╩═╝┴┴ ┴└─┘─┴┘
  
  Like komen thread 1.2
        
`);

First();