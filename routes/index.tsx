import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Data } from "../types.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
    const url = new URL(ctx.url);
    const id = url.searchParams.get("id");
    if (id) {
      return new Response("", {
        status: 307,
        headers: { Location: `/${id}` },
      });
    }
    const response = await Axios.get<Data>(`https://learnyourlesson.deno.dev/`);
    if (response.status !== 200) {
      return new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    const data = response.data;
    return await ctx.render(data);
  },
};

export default function Home(props: PageProps<Data>) {
  const message = props.data;
  return (
    <>
      <div>
        <div class="cont-header">
          <div class="go-home pinkAsFuck flex-center" id="refresh-button">
            <a href="/">
              <img
                height="60px"
                width="85px"
                src="/images/refresh-icon.png"
                alt="Refresh"
              />
            </a>
          </div>
          <h1 class="pinkAsFuck">Welcome to BadTips.com</h1>
          <div class="cont-search flex-center">
            <h2 id="title-form">Try your luck !</h2>
            <form action="/" method="get" class="flex-column">
              <input
                type="text"
                name="id"
                placeholder="Enter a fucking number ..."
                required
              />
              <input type="submit" value="Go Go Go !" />
            </form>
          </div>
        </div>
        <div class="flex-center">
          <div class="icon-gift">
            <a href="#cont-message-random">
              <img
                height="250px"
                width="300px"
                src="/images/gift.gif"
                alt="Refresh"
              />
            </a>
          </div>
          <div class="cont-data flex-center" id="cont-message-random">
            <p class="font-message">{message}</p>
          </div>
        </div>
        <div class="gif-movil"></div>
      </div>
    </>
  );
}
