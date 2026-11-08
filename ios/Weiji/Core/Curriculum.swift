import Foundation

enum JSONValue: Codable, Equatable {
    case string(String), number(Double), bool(Bool), array([JSONValue]), object([String: JSONValue]), null
    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if c.decodeNil() { self = .null }
        else if let v = try? c.decode(Bool.self) { self = .bool(v) }
        else if let v = try? c.decode(Double.self) { self = .number(v) }
        else if let v = try? c.decode(String.self) { self = .string(v) }
        else if let v = try? c.decode([JSONValue].self) { self = .array(v) }
        else { self = .object(try c.decode([String: JSONValue].self)) }
    }
    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .string(let v): try c.encode(v)
        case .number(let v): try c.encode(v)
        case .bool(let v): try c.encode(v)
        case .array(let v): try c.encode(v)
        case .object(let v): try c.encode(v)
        case .null: try c.encodeNil()
        }
    }
    var strings: [String] {
        switch self { case .string(let s): [s]; case .array(let a): a.flatMap(\.strings); default: [] }
    }
}

struct CourseModule: Codable, Identifiable {
    let id: String
    let title: String
    let subtitle: String?
    let lessons: [CourseLesson]
    var units: [CourseUnit] { lessons.flatMap(\.units) }
    var shortTitle: String { title.components(separatedBy: " · ").last ?? title }
    var symbol: String {
        switch id { case "m1": "function"; case "m2": "arrow.right.to.line"; case "m3": "chart.line.uptrend.xyaxis"; case "m4": "sum"; default: "waveform.path" }
    }
}
struct CourseLesson: Codable, Identifiable { let id: String; let title: String; let units: [CourseUnit] }
struct CourseUnit: Codable, Identifiable {
    let id: String
    let title: String
    let intro: Introduction
    let exercises: [Exercise]
}
struct Introduction: Codable {
    let heading: String?
    let hook: String?
    let intuition: String?
    let takeaway: String?
    let formula: Formula?
    let visual: [String: JSONValue]?
}
struct Formula: Codable { let latex: String; let caption: String? }
struct Exercise: Codable {
    let type: String
    let prompt: String
    let options: [String]?
    let answer: JSONValue
    let explain: String?
    func isCorrect(text: String = "", choice: Int? = nil) -> Bool {
        switch answer {
        case .number(let n): return choice == Int(n)
        case .bool(let b): return choice == (b ? 0 : 1)
        default: return AnswerMatcher.matches(text, answers: answer.strings)
        }
    }
}

enum AnswerMatcher {
    static func normalize(_ value: String) -> String {
        value.precomposedStringWithCompatibilityMapping.lowercased()
            .filter { !$0.isWhitespace }.replacingOccurrences(of: "−", with: "-")
            .replacingOccurrences(of: "–", with: "-").replacingOccurrences(of: "π", with: "pi")
    }
    static func numeric(_ value: String) -> Double? {
        let pattern = #"^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$"#
        func number(_ s: String) -> Double? {
            guard s.range(of: pattern, options: .regularExpression) != nil, let n = Double(s), n.isFinite else { return nil }
            return n
        }
        if let n = number(value) { return n }
        let parts = value.split(separator: "/", omittingEmptySubsequences: false)
        guard parts.count == 2, let a = number(String(parts[0])), let b = number(String(parts[1])), b != 0 else { return nil }
        let result = a / b
        return result.isFinite ? result : nil
    }
    static func matches(_ input: String, answers: [String]) -> Bool {
        let a = normalize(input)
        guard !a.isEmpty else { return false }
        return answers.contains {
            let b = normalize($0)
            if a == b { return true }
            guard let x = numeric(a), let y = numeric(b) else { return false }
            return abs(x - y) < 1e-6
        }
    }
}

enum Curriculum {
    static func load(bundle: Bundle = .main) throws -> [CourseModule] {
        guard let url = bundle.url(forResource: "curriculum", withExtension: "json", subdirectory: "Content") else {
            throw CocoaError(.fileNoSuchFile)
        }
        return try JSONDecoder().decode([CourseModule].self, from: Data(contentsOf: url))
    }
}
