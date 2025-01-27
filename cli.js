#! /usr/bin/env node

const yargs = require("yargs")
/** @type {(args:string[]) => string[]} */
// @ts-ignore
const hideBin = require("yargs/helpers").hideBin
const http = require("http")
const { setup } = require(".")

/**
 * @typedef Options options
 * @property {string|null} [token]
 * @property {string|null} [delegates]
 * @property {number} [port]
 * @property {"info"|"error"} [loglevel]
 * @property {boolean} [strict]
 * 
 * @param {Options} options
 */
const main = async ({
  token = null,
  delegates = null,
  port = 3000,
  loglevel = "error",
  strict = false,
}) => {
  const service = await setup({ strict, loglevel, token, delegates })

  const server = http.createServer(service)
  server.listen(port)
}

/** @type {import('yargs').Argv<Options>} */
const cli = yargs(hideBin(process.argv))
main(cli.argv)
