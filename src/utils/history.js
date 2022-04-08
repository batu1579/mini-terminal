/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 12:00:59
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 20:46:34
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

    removeCurrent() {
        let data = this.current.data;

        if (this.current == this.head) {
            // 指针在链表头
            if (this.current.prev == null && this.current.next == null) {
                // 链表只有一个节点的时候
                this.clearAll();
            } else {
                this.head = this.head.next;
                this.head.prev = null;
                this.current = this.head;
            }
        } else if (this.current.next == null) {
            // 在指针在链表尾
            this.current = this.current.prev;
            this.current.next = null;
        } else {
            // 指针在链表中间
            let prev = this.current.prev;
            let next = this.current.next;
            
            prev.next = next;
            next.prev = prev;

            this.current = next;
        }

        return data;
    }

    clearAll() {
        this.head = new DNode("");
        this.current = this.head;
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
