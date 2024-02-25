import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Data, DataId } from "../types.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, DataId>) {
    const id = ctx.params.id;
    const response = await Axios.get<Data>(
      `https://learnyourlesson.deno.dev/${id}`,
    );
    if (response.status !== 200) {
      return new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return await ctx.render({ data: response.data, id: id });
  },
};

export default function learnyourlesson(props: PageProps<DataId>) {
  const message = props.data.data;
  const num = props.data.id;
  return (
    <>
      <div>
        <div class="cont-header-bad-tip">
          <div class="go-home flex-center" id="button-back">
            <a href="/">
              <img
                height="70px"
                width="95px"
                src="/images/back-icon.png"
                alt="Back"
              />
            </a>
          </div>
          <h1 id="bad-tip-title" class="pinkAsFuck">Bad Tip {num}</h1>
          <div class="icon-gift">
            <a href="#cont-message-by-id">
              <img
                height="250px"
                width="300px"
                src="/images/gift.gif"
                alt="gift"
              />
            </a>
          </div>
        </div>
        <div class="flex-column">
          <div class="cont-data flex-center" id="cont-message-by-id">
            <p class="font-message">{message}</p>
          </div>
          <div class="flex-center">
            <div id="bug-container">
              <img src="/images/bug.gif" alt="bug" />
            </div>
            <div id="alert-container">
              <img src="/images/alert.gif" alt="alert" />
            </div>
            <div id="malware-container">
              <img src="/images/malware.gif" alt="malware" />
            </div>
          </div>
          <div id="ad-gif">
            <iframe
              src="https://giphy.com/embed/YFJ2iCW2FSnbpz0NKp"
              width="100%"
              height="100%"
              style="position:absolute"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            >
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}
