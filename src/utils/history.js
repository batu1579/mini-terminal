/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 12:00:59
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 11:45:01
 * @FilePath: \\src\\utils\\history.js
 * @Description: 指令历史
 */


class DNode {
    constructor(data, prev = null) {
        this.data = data;
        this.prev = prev;
        this.next = null;
    }
}

export class History {
    constructor() {
        this.head = new DNode("");
        this.current = this.head;
    }

    getAll(to_string = true) {
        let data = [];
        let p = this.head.next;

        while (p != null) {
            data.push(p.data);
            p = p.next;
        }

        return to_string ? data.join("\n") : data;
    }

    getData() {
        return this.current.data;
    }

    push(data) {
        this.current.next = new DNode(data, this.current);
        this.current = this.current.next;
    }

    forward(times = 1) {
        for (let i = 0; i < times; i++) {
            if (this.current.next) {
                this.current = this.current.next;
            }
        }
    }

    backward(times = 1) {
        for (let i = 0; i < times; i++) {
            if (this.current.prev) {
                this.current = this.current.prev;
            }
        }
    }
}
