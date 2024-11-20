export class DateTimeUtil {
  static formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });
  }

  static formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  static dateToDateTimeLocal(date?: Date | string) {
    if (!date) return;

    const d = new Date(date);

    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  static parseDuration(d1: Date | string, d2: Date | string) {
    const start = new Date(d1);
    const end = new Date(d2);

    let delta = Math.abs(end.getTime() - start.getTime()) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta % 60; // in theory the modulus is not required

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
