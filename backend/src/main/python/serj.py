#ver 1.09.01

import igraph as ig
import itertools

def save_to_file(graph, path):
    formats = ["graphml"]
    for form in formats:
        graph.save(path,form)
    #graph.write_svg(path+".svg", layout = "circle", labels="weight")
    out = draw_graph(graph,1000,"circle","weight","weight",path=path+".png")
    graph.save(path+".dot","dot")
    graph.save(path+".gml","gml")
    graph.save(path+".net","net")
    out.save(path+".png")

def load_from_file(path):
    return ig.Graph.Read_GraphML(path)


def make_new_graph (source_graph, new_edges_list, score):
    new_graph = ig.Graph()
    new_graph.add_vertices(source_graph.vcount())
    new_graph.add_edges(new_edges_list)
    new_graph.vs["weight"] = score
    new_graph.vs["color"] = source_graph.vs["color"]
    new_graph.vs["id"] = source_graph.vs["id"]
    new_graph.vs["labels"] = source_graph.vs["label"]
    new_graph.es['weight'] = source_graph.es['weight']
    new_graph.es['color'] = source_graph.es['color']
    new_graph.es['id'] = source_graph.es['id']
    new_graph.es['label'] = source_graph.es['label']
    new_graph.es['weight'] = source_graph.es['weight']
    return new_graph

def draw_graph(graph, pic_size, layout, v_label, e_label, path=None):
    layout = graph.layout(layout)
    visual_style = {}
    visual_style["vertex_size"] = [10+10*w/graph.vcount() for w in graph.vs["weight"]]
    avg_ew = sum(graph.es["weight"])/graph.ecount()
    visual_style["edge_width"] = [0.01 + 1*w*w/avg_ew/avg_ew for w in graph.es["weight"]]
    visual_style["layout"] = layout
    visual_style["bbox"] = (pic_size, pic_size)
    
    color_dict = {"red": "red", "green": "green", "black": "black", "blue": "blue"}
    graph.vs["color"] = [color_dict[tmp] for tmp in graph.vs["color"]]
    graph.es["color"] = [color_dict[tmp] for tmp in graph.es["color"]]

    visual_style["vertex_label"] = graph.vs[v_label]
    visual_style["edge_label"] = graph.es[e_label]
    out = ig.plot(graph, path, **visual_style) if path else ig.plot(graph, **visual_style)
    return out

def paint_src(graph, tmp_graph):
    for i in range(graph.vcount()):
        graph.vs[i]["color"] = "red"
    for i in range(graph.ecount()):
        graph.es[i]["color"] = "black"
    
    tmp = [(tmp_graph.es[idx].tuple[i]) for idx, i in itertools.product(range(tmp_graph.ecount()), range(2))]

    for i in tmp:
        graph.vs[i]["color"] = "green"

    for i, j in itertools.product(range(graph.ecount()), range(tmp_graph.ecount())):
        if (tmp_graph.es[j].tuple[0] == graph.es[i].tuple[0] and tmp_graph.es[j].tuple[1] == graph.es[i].tuple[1]) or (graph.es[i].tuple[0] == tmp_graph.es[j].tuple[1] and graph.es[i].tuple[1] == tmp_graph.es[j].tuple[0]):
            graph.es[i]["color"] = "blue"
    v_sum = 0
    v_num = 0
    e_sum = 0
    e_num = 0
    for i in range(graph.vcount()):
        if (graph.vs[i]["color"] == "green"):
            v_sum += graph.vs[i]["weight"]
            v_num += 1
    for i in range(graph.ecount()):
        if (graph.es[i]["color"] == "blue"):
            e_sum += graph.es[i]["weight"]
            e_num += 1
    return (v_sum, e_sum, v_num, e_num)