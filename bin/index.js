#! /usr/bin/env node
import chalk from 'chalk';
console.clear();
if (process.argv[2] === '-v' || process.argv[2] === '--version') {
    const __dirname = (await import('path')).resolve();
    const info = JSON.parse((await import('fs')).readFileSync(`${__dirname}/package.json`, 'utf8'));
    console.log(info.version);
    process.exit(0);
}
const getTimeFromChristmas = () => {
    const now = new Date();
    let christmas = new Date(now.getFullYear(), 11, 25);
    if (now > christmas) {
        christmas = new Date(now.getFullYear() + 1, 11, 25);
    }
    const difference = christmas.getTime() - now.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return {
        seconds: seconds % 60,
        minutes: minutes % 60,
        hours: hours % 24,
        days,
        date: christmas
    };
};
const format = (num) => {
    return num < 10 ? `0${num}` : num.toString();
};
const christmasText = (text, count) => {
    let result = '';
    text.split('').forEach((char, i) => {
        if (count % 2 === 0) {
            if (i % 2 === 0) {
                result += chalk.red(char);
            }
            else {
                result += chalk.white(char);
            }
        }
        else {
            if (i % 2 === 0) {
                result += chalk.white(char);
            }
            else {
                result += chalk.red(char);
            }
        }
    });
    return chalk.bold(result);
};
let count = 0;
const display = () => {
    console.clear();
    const time = getTimeFromChristmas();
    console.log(christmasText(`Merry Christmas! \n`, count));
    const timeUntilChristmas = () => {
        if (time.date.getFullYear() === new Date().getFullYear() && time.date.getMonth() === new Date().getMonth() && time.date.getDate() === new Date().getDate()) {
            return christmasText('✨ Today is Christmas! Happy holidays! ✨', count);
        }
        else {
            return `${time.days}:${format(time.hours)}:${format(time.minutes)}:${format(time.seconds)}`;
        }
    };
    console.log(chalk.white.bold(`Time until ${chalk.redBright('Christmas')}: ${timeUntilChristmas()} \n\n(by @alessandrofoglia07)`));
    count++;
};
setInterval(display, 1000);
