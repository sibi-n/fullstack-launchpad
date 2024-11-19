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
      timeStyle: "short",
    });
  }

  static dateToDateTimeLocal(date?: Date | string) {
    if (!date) return;

    const d = new Date(date);

    return `${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()}T${d.getHours()}:${d.getMinutes()}`;
  }
}
