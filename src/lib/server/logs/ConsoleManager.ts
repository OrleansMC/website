import colors from 'colors';
import log from 'fancy-log';

export default class ConsoleManager {
    public static log(source: string, msg: string) {
        let message = colors.grey(msg)
        log(`[${source}] ${message}`);
    }

    public static info(source: string, msg: string) {
        let message = colors.cyan(msg)
        log(`[${source}] ${message}`);
    }

    public static warn(source: string, msg: string) {
        let message = colors.yellow(msg)
        log(`[${source}] ${message}`);
    }

    public static error(source: string, msg: string) {
        let message = colors.red(msg)
        log(`[${source}] ${message}`);
    }

    public static debug(source: string, msg: string) {
        let message = colors.magenta(msg)
        log(`[${source}] ${message}`);
    }
}