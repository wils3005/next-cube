import Axios from "axios";
import type { NextApiHandler } from "next";

import { RequestQuery } from "../../schemas/request-query";
import { ResponseBody } from "../../schemas/response-body";

const main: NextApiHandler<ResponseBody> = async (req, res) => {
  const { count, offset } = RequestQuery.parse(req.query);

  const url =
    "http://hapi.fhir.org/baseR4/Patient" +
    "?birthdate=gt1950-01-01" +
    `&_count=${count}` +
    "&_format=json" +
    `&_getpagesoffset=${offset}` +
    "&_sort=_lastUpdated" +
    "&_total=accurate";

  try {
    const { data } = await Axios.get<ResponseBody>(url);
    res.json(data);
  } catch (error: unknown) {
    console.error({ error });
    res.status(500).end();
  }
};

export default main;
